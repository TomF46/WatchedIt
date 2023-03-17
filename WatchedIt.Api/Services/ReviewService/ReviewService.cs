using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.ReviewModels;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.ReviewService
{
    public class ReviewService : IReviewService
    {
        public readonly WatchedItContext _context;

        public ReviewService(WatchedItContext context)
        {
            _context = context;
        }
        public async Task<List<GetReviewDto>> GetAllByUser(int id)
        {
            var user = await _context.Users.Include(f => f.Reviews).ThenInclude(r => r.Film).Include(r=> r.Reviews).ThenInclude(r => r.User).FirstOrDefaultAsync(u => u.Id == id);
            if(user is null) throw new NotFoundException($"User with Id '{id}' not found.");

            return user.Reviews.Select(r => ReviewMapper.Map(r)).ToList();
        }

        public async Task<List<GetReviewDto>> GetAllForFilm(int id)
        {
            var film = await _context.Films.Include(f => f.Reviews).ThenInclude(r => r.Film).Include(r=> r.Reviews).ThenInclude(r => r.User).FirstOrDefaultAsync(f => f.Id == id);
            if(film is null) throw new NotFoundException($"Film with Id '{id}' not found.");

            return film.Reviews.Select(r => ReviewMapper.Map(r)).ToList();
        }

        public async Task<GetReviewDto> GetById(int id)
        {
            var review = await _context.Reviews.Include(r => r.Film).Include(r=> r.User).FirstOrDefaultAsync(r => r.Id == id);
            if(review is null) throw new NotFoundException($"Review with Id '{id}' not found.");

            return ReviewMapper.Map(review);
        }

        public async Task<GetReviewDto> Add(int id , AddReviewDto newReview)
        {
            var user = await _context.Users.Include(u => u.Reviews).FirstOrDefaultAsync(u => u.Id == id);
            if(user is null) throw new BadRequestException($"User with Id '{id}' not found.");

            var film = await _context.Films.Include(f => f.Reviews).FirstOrDefaultAsync(f => f.Id == newReview.FilmId);
            if(film is null) throw new BadRequestException($"Film with Id '{newReview.FilmId}' not found.");

            var review = new Review{
                User = user,
                Film = film,
                Rating = newReview.Rating,
                Text = newReview.Text
            };

            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();

            return ReviewMapper.Map(review);
        }

        public async Task<GetReviewDto> Update(int id, int userId ,UpdateReviewDto updatedReview)
        {
            var review = await _context.Reviews.Include(r => r.Film).Include(r=> r.User).FirstOrDefaultAsync(r => r.Id == id);
            if(review is null) throw new NotFoundException($"Review with Id '{id}' not found.");

            var user = await _context.Users.Include(u => u.Reviews).FirstOrDefaultAsync(u => u.Id == id);
            if(user is null || review.User.Id != user.Id) throw new Exceptions.UnauthorizedAccessException("User not authorized");

            review.Rating = updatedReview.Rating;
            review.Text = updatedReview.Text;
            await _context.SaveChangesAsync();
            return ReviewMapper.Map(review);
        }

        public void Delete(int id, int userId)
        {
            var review = _context.Reviews.Include(r => r.Film).Include(r=> r.User).FirstOrDefault(r => r.Id == id);
            if(review is null) throw new NotFoundException($"Review with Id '{id}' not found.");

            var user = _context.Users.Include(u => u.Reviews).FirstOrDefault(u => u.Id == id);
            if(user is null || review.User.Id != user.Id) throw new Exceptions.UnauthorizedAccessException("User not authorized");

            _context.Reviews.Remove(review);
            _context.SaveChanges();
            return;
        }
    }
}