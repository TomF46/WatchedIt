using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.ReviewModels;

namespace WatchedIt.Api.Services.ReviewService
{
    public interface IReviewService
    {
        Task<PaginationResponse<GetReviewDto>> GetAllForFilm(int id, ReviewSearchWithPaginationParameters parameters);
        Task<PaginationResponse<GetReviewDto>> GetAllByUser(int id, ReviewSearchWithPaginationParameters parameters);
        Task<GetReviewDto> GetById(int id);
        Task<GetReviewDto> Add(int filmId, int userId, AddReviewDto newReview);
        Task<GetReviewDto> Update(int id, int userId, UpdateReviewDto updatedReview);
        void Delete(int id, int userId);
        Task UpdateAverageScore(Film film);
    }
}