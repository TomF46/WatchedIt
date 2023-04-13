using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.ReviewModels;
using WatchedIt.Api.Services.Mapping;
using WatchedIt.Api.Services.ReviewService;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/Films/{id}/reviews")]
    public class FilmReviewsController : ControllerBase
    {
        public readonly IReviewService _reviewService;
        public FilmReviewsController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse<GetReviewOverviewDto>>> GetAll(int id, [FromQuery] PaginationParameters parameters){
            return Ok(await _reviewService.GetAllForFilm(id, parameters));
        }

        [HttpGet("{reviewId}")]
        public async Task<ActionResult<GetReviewDto>> GetSingle(int id, int reviewId){
            var review = await _reviewService.GetById(reviewId);
            return Ok(review);
        }
        
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<GetReviewDto>> AddReview(int id, AddReviewDto newReview)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _reviewService.Add(id ,userId, newReview));
        }

        [Authorize]
        [HttpPut("{reviewId}")]
        public async Task<ActionResult<GetReviewDto>> UpdateReview(int id, int reviewId, UpdateReviewDto updatedReview){
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _reviewService.Update(reviewId, userId ,updatedReview));
        }

        [Authorize]
        [HttpDelete("{reviewId}")]
        public ActionResult DeleteReview(int id, int reviewId){
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            _reviewService.Delete(reviewId,userId);
            return Ok();
        }
    }
}