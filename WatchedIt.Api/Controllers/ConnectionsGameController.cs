using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using WatchedIt.Api.Models.Games.Connections;
using WatchedIt.Api.Services.Games.Connections;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/games/[controller]")]
    public class ConnectionsGameController : ControllerBase
    {
        private readonly IConnectionsGameService _connectionsGameService;
        public ConnectionsGameController(IConnectionsGameService connectionsGameService)
        {
            _connectionsGameService = connectionsGameService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse<GetConnectionsGameDto>>> GetAll([FromQuery] PaginationParameters parameters)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _connectionsGameService.GetAllForUser(userId, parameters));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetConnectionsGameDto>> GetSingle(int id)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _connectionsGameService.GetById(id, userId));
        }

        [HttpPost]
        public async Task<ActionResult<GetConnectionsGameDto>> StartGame()
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _connectionsGameService.StartGame(userId));
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<GetConnectionsGameDto>> Guess(int id,  GuessPersonForConnectionGameDto guess)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _connectionsGameService.Guess(id, userId, guess));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<GetConnectionsGameDto>> Forefeit(int id)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _connectionsGameService.Forfeit(id, userId));
        }
    }
}