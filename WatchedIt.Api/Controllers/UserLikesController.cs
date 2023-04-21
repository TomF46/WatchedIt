using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Services.Likes;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/Users/me/likes")]
    public class UserLikesController : ControllerBase
    {
        public readonly ILikesService _likesService;
        public UserLikesController(ILikesService likesService)
        {
            _likesService = likesService;   
        }

        [HttpPost]
        public async Task<ActionResult<GetPersonIsLikedDto>> AddLike(AddLikedPersonDto likedPerson){
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _likesService.AddLike(userId, likedPerson));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<GetPersonIsLikedDto>> RemoveLike(int id)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _likesService.RemoveLike(userId, id));
        }
    }
}