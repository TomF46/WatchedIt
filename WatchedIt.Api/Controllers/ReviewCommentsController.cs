using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.CommentModels;
using WatchedIt.Api.Services.Mapping;
using WatchedIt.Api.Services.ReviewCommentsService;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/Reviews/{id}/comments")]
    public class ReviewCommentsController : ControllerBase
    {
        public readonly IReviewCommentsService _reviewCommentsService;
        public ReviewCommentsController(IReviewCommentsService reviewCommentsService)
        {
            _reviewCommentsService = reviewCommentsService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse<GetReviewCommentDto>>> GetAll(int id, [FromQuery] PaginationParameters parameters){
            var comments = await _reviewCommentsService.GetCommentsForReview(id, parameters);
            return Ok(comments);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<GetReviewCommentDto>> AddComment(int id, AddCommentDto newComment)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _reviewCommentsService.Add(id ,userId, newComment));
        }

        [Authorize]
        [HttpPut("{commentId}")]
        public async Task<ActionResult<GetReviewCommentDto>> UpdateComment(int id, int commentId, UpdateCommentDto updatedComment){
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _reviewCommentsService.Update(commentId, userId ,updatedComment));
        }

        [Authorize]
        [HttpDelete("{commentId}")]
        public ActionResult DeleteComment(int id, int commentId){
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            _reviewCommentsService.Delete(commentId, userId);
            return Ok();
        }
    }
}