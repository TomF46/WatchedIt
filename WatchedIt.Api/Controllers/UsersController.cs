using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.News;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Models.UserModels;
using WatchedIt.Api.Services.Mapping;
using WatchedIt.Api.Services.UserService;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse<GetUserDto>>> Get([FromQuery] UserSearchWithPaginationParameters parameters)
        {
            return Ok(await _userService.GetAll(parameters));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetUserDto>> GetSingle(int id)
        {
            var user = await _userService.GetById(id);
            return Ok(user);
        }

        [HttpGet("me")]
        public async Task<ActionResult<GetUserDto>> GetMe()
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            var user = await _userService.GetById(userId);
            return Ok(user);
        }

        [HttpPut("me")]
        public async Task<ActionResult<GetUserDto>> UpdateMe(UpdateUserDto updatedUser)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            var user = await _userService.Update(userId, updatedUser);
            return Ok(user);
        }

        [HttpGet("{id}/watched")]
        public async Task<ActionResult<PaginationResponse<GetFilmOverviewDto>>> GetWatchedFilms(int id, [FromQuery] FilmSearchWithPaginationParameters parameters)
        {
            return Ok(await _userService.GetWatchedFilms(id, parameters));
        }

        [HttpGet("{id}/likes")]
        public async Task<ActionResult<PaginationResponse<GetSimplePersonDto>>> GetLikedPeople(int id, [FromQuery] PersonSearchWithPaginationParameters parameters)
        {
            return Ok(await _userService.GetLikedPeople(id, parameters));
        }

        [HttpGet("me/admin")]
        public async Task<ActionResult<GetIsAdminDto>> GetIsAdmin()
        {
            if (!HttpContext.User.Identity.IsAuthenticated)
            {
                return new GetIsAdminDto
                {
                    IsAdmin = false
                };
            };
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _userService.GetIsUserAdmin(userId));
        }

        [HttpGet("me/canPublish")]
        public async Task<ActionResult<GetCanPublishDto>> GetCanPublish()
        {
            if (!HttpContext.User.Identity.IsAuthenticated)
            {
                return new GetCanPublishDto
                {
                    CanPublish = false
                };
            };
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _userService.GetCanPublish(userId));
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("{id}/canPublish")]
        public async Task<ActionResult<GetUserDto>> SetCanPublish(int id, UserCanPublishDto canPublish)
        {
            return Ok(await _userService.SetUserCanPublish(id, canPublish));
        }
    }
}