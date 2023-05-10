using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.CommentModels;
using WatchedIt.Api.Services.Mapping;
using WatchedIt.Api.Services.NotificationService;

namespace WatchedIt.Api.Services.ReviewCommentsService
{
    public class ReviewCommentsService : IReviewCommentsService
    {
        public readonly WatchedItContext _context;
        public readonly INotificationService _notificationService;

        public ReviewCommentsService(WatchedItContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        public async Task<PaginationResponse<GetReviewCommentDto>> GetCommentsForReview(int id, PaginationParameters parameters)
        {
            var review = await _context.Reviews.FirstOrDefaultAsync(r => r.Id == id);
            if(review is null) throw new NotFoundException($"Review with Id '{id}' not found.");
            
        
            var query = _context.ReviewComments.Include(c => c.User).Include(c => c.Review).Where(x => x.Review.Id == id);
            var count = query.Count();
            query.OrderBy(x => x.CreatedDate);
            var comments = await query.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize).ToListAsync();
            var mappedComments = comments.Select(c => CommentMapper.mapReviewComment(c)).ToList();
            return new PaginationResponse<GetReviewCommentDto>(mappedComments, parameters.PageNumber, parameters.PageSize, count);
        }

        public async Task<GetReviewCommentDto> Add(int reviewId, int userId, AddCommentDto newComment)
        {
            var review = await _context.Reviews.Include(r => r.User).Include(r => r.Film).FirstOrDefaultAsync(r => r.Id == reviewId);
            if(review is null) throw new NotFoundException($"Review with Id '{reviewId}' not found.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if(user is null) throw new BadRequestException($"User with Id '{userId}' does not exist");

            var comment = new ReviewComment {
                Review = review,
                User = user,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
                Text = newComment.Text
            };

            await _context.ReviewComments.AddAsync(comment);
            await _context.SaveChangesAsync();

            await _notificationService.sendNewCommentOnOwnedReviewNotification(review.User, comment);

            return CommentMapper.mapReviewComment(comment);
        }

        public async Task<GetReviewCommentDto> Update(int commentId, int userId, UpdateCommentDto updatedComment)
        {
            var comment = await _context.ReviewComments.Include(c => c.User).Include(c => c.Review).FirstOrDefaultAsync(c => c.Id == commentId);
            if(comment is null) throw new NotFoundException($"Comment with Id '{commentId}' not found.");

            if(comment.User.Id != userId) throw new Exceptions.UnauthorizedAccessException($"User does not own this comment.");

            comment.Text = updatedComment.Text;
            comment.UpdatedDate = DateTime.Now;
            await _context.SaveChangesAsync();
            return CommentMapper.mapReviewComment(comment);
        }

        public void Delete(int id, int userId)
        {
            var comment = _context.ReviewComments.Include(c => c.User).FirstOrDefault(c => c.Id == id);
            if(comment is null) throw new NotFoundException($"Comment with Id '{id}' not found.");

            if(comment.User.Id != userId) throw new Exceptions.UnauthorizedAccessException($"User does not own this comment.");

            _context.ReviewComments.Remove(comment);
            _context.SaveChanges();
            return;
        }
    }
}