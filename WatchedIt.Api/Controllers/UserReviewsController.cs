using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.ReviewModels;
using WatchedIt.Api.Services.ReviewService;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/Users/{id}/reviews")]
    public class UserReviewsController : ControllerBase
    {
        public readonly IReviewService _reviewService;
        public UserReviewsController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse<GetReviewOverviewDto>>> GetAll(int id, [FromQuery] PaginationParameters parameters){
            var review = await _reviewService.GetAllByUser(id, parameters);
            return Ok(review);
        }

    }
}