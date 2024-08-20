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
    [Route("api/reviews")]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewService _reviewService;
        public ReviewsController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse<GetReviewDto>>> GetAll([FromQuery] ReviewSearchWithPaginationParameters parameters)
        {
            var review = await _reviewService.GetAll(parameters);
            return Ok(review);
        }

    }
}