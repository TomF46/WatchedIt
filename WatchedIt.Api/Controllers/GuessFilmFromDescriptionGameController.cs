using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using WatchedIt.Api.Models.Games.GuessFilmFromDescription;
using WatchedIt.Api.Services.Games.GuessFilmFromDescription;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/games/[controller]")]
    public class GuessFilmFromDescriptionGameController : ControllerBase
    {
        private readonly IGuessFilmFromDescriptionGameService _guessFilmFromDescriptionGameService;
        public GuessFilmFromDescriptionGameController(IGuessFilmFromDescriptionGameService guessFilmFromDescriptionGameService)
        {
            _guessFilmFromDescriptionGameService = guessFilmFromDescriptionGameService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse<GetGuessFilmFromDescriptionGameDto>>> GetAll([FromQuery] PaginationParameters parameters)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _guessFilmFromDescriptionGameService.GetAllForUser(userId, parameters));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetGuessFilmFromDescriptionGameDto>> GetSingle(int id)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _guessFilmFromDescriptionGameService.GetById(id, userId));
        }

        [HttpPost]
        public async Task<ActionResult<GetGuessFilmFromDescriptionGameDto>> StartGame()
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _guessFilmFromDescriptionGameService.StartGame(userId));
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<GetGuessFilmFromDescriptionGameDto>> Guess(int id, GuessFilmFromDescriptionGameGuessDto guess)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _guessFilmFromDescriptionGameService.Guess(id, userId, guess));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<GetGuessFilmFromDescriptionGameDto>> Forefeit(int id)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _guessFilmFromDescriptionGameService.Forfeit(id, userId));
        }

        [HttpGet("leaderboard")]
        public async Task<ActionResult<PaginationResponse<GetGuessFilmFromDescriptionLeaderboardEntryDto>>> GetLeaderboard([FromQuery] PaginationParameters parameters)
        {
            return Ok(await _guessFilmFromDescriptionGameService.GetLeaderboard(parameters));
        }
    }
}