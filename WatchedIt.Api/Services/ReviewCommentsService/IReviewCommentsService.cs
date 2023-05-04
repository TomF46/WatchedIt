using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.CommentModels;

namespace WatchedIt.Api.Services.ReviewCommentsService
{
    public interface IReviewCommentsService
    {
        Task<PaginationResponse<GetReviewCommentDto>> GetCommentsForReview(int id, PaginationParameters parameters);
        Task<GetReviewCommentDto> Add(int reviewId, int userId, AddCommentDto newComment);
        Task<GetReviewCommentDto> Update(int commentId, int userId, UpdateCommentDto updatedComment);
        void Delete(int id, int userId);
    }
}