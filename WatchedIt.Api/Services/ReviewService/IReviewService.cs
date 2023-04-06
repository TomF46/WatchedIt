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
        Task<PaginationResponse<GetReviewOverviewDto>> GetAllForFilm(int id, PaginationParameters parameters);
        Task<PaginationResponse<GetReviewOverviewDto>> GetAllByUser(int id, PaginationParameters parameters);
        Task<GetReviewDto> GetById(int id, int userId);
        Task<GetReviewDto> Add(int filmId, int userId, AddReviewDto newReview);
        Task<GetReviewDto> Update(int id, int userId ,UpdateReviewDto updatedReview);
        void Delete(int id, int userId);
        Task UpdateAverageScore(Film film);
    }
}