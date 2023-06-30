using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.FilmModels;
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
        public readonly IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetUserDto>> GetSingle(int id){
            var user = await _userService.GetById(id);
            return Ok(user);
        }

        [HttpGet("me")]
        public async Task<ActionResult<GetUserDto>> GetMe(){
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            var user = await _userService.GetById(userId);
            return Ok(user);
        }

        [HttpPut("me")]
        public async Task<ActionResult<GetUserDto>> UpdateMe(UpdateUserDto updatedUser){
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            var user = await _userService.Update(userId ,updatedUser);
            return Ok(user);
        }

        [HttpGet("{id}/watched")]
        public async Task<ActionResult<PaginationResponse<GetFilmOverviewDto>>> GetWatchedFilms(int id, [FromQuery] PaginationParameters paginationParameters)
        {
            return Ok(await _userService.GetWatchedFilms(id, paginationParameters));
        }

        [HttpGet("{id}/likes")]
        public async Task<ActionResult<PaginationResponse<GetSimplePersonDto>>> GetLikedPeople(int id, [FromQuery] PaginationParameters paginationParameters)
        {
            return Ok(await _userService.GetLikedPeople(id, paginationParameters));
        }

        [HttpGet("me/admin")]
        public async Task<ActionResult<GetIsAdminDto>> GetIsAdmin(){
            if(!HttpContext.User.Identity.IsAuthenticated) {
                return new GetIsAdminDto{
                    isAdmin = false
                };
            };
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _userService.GetIsUserAdmin(userId));
        }
    }
}