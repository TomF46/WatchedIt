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
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        public readonly IReviewService _reviewService;
        public ReviewsController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<GetReviewDto>> GetSingle(int id){
            var review = await _reviewService.GetById(id);
            return Ok(review);
        }
        
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<GetReviewDto>> AddReview(AddReviewDto newReview)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _reviewService.Add(userId, newReview));
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<GetReviewDto>> UpdateReview(int id, UpdateReviewDto updatedReview){
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _reviewService.Update(id, userId ,updatedReview));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult DeleteReview(int id){
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            _reviewService.Delete(id,userId);
            return Ok();
        }
    }
}