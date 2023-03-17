using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.User;
using WatchedIt.Api.Services.Mapping;
using WatchedIt.Api.Services.UserService;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        public readonly IUserService _userService;
        public UserController(IUserService userService)
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
    }
}