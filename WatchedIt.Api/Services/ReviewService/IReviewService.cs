using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.ReviewModels;

namespace WatchedIt.Api.Services.ReviewService
{
    public interface IReviewService
    {
        Task<List<GetReviewDto>> GetAllForFilm(int id);
        Task<List<GetReviewDto>> GetAllByUser(int id);
        Task<GetReviewDto> GetById(int id);
        Task<GetReviewDto> Add(int userId, AddReviewDto newReview);
        Task<GetReviewDto> Update(int id, int userId ,UpdateReviewDto updatedReview);
        void Delete(int id, int userId);

    }
}