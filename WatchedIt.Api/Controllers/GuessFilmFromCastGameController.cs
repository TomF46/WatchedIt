using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using WatchedIt.Api.Models.Games.GuessFilmFromCast;
using WatchedIt.Api.Services.Games.GuessFilmFromCast;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/games/[controller]")]
    public class GuessFilmFromCastGameController : ControllerBase
    {
        private readonly IGuessFilmFromCastGameService _guessFilmFromCastGameService;
        public GuessFilmFromCastGameController(IGuessFilmFromCastGameService guessFilmFromCastGameService)
        {
            _guessFilmFromCastGameService = guessFilmFromCastGameService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse<GetGuessFilmFromCastGameDto>>> GetAll([FromQuery] PaginationParameters parameters)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _guessFilmFromCastGameService.GetAllForUser(userId, parameters));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetGuessFilmFromCastGameDto>> GetSingle(int id)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _guessFilmFromCastGameService.GetById(id, userId));
        }

        [HttpPost]
        public async Task<ActionResult<GetGuessFilmFromCastGameDto>> StartGame()
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _guessFilmFromCastGameService.StartGame(userId));
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<GetGuessFilmFromCastGameDto>> Guess(int id, GuessFilmFromCastGameGuessDto guess)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _guessFilmFromCastGameService.Guess(id, userId, guess));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<GetGuessFilmFromCastGameDto>> Forefeit(int id)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _guessFilmFromCastGameService.Forfeit(id, userId));
        }
    }
}