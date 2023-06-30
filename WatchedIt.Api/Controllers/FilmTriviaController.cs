using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.FilmTrivia;
using WatchedIt.Api.Services.FilmTriviaService;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/Films/{id}/trivia")]
    public class FilmTriviaController : ControllerBase
    {
        private readonly IFilmTriviaService _filmTriviaService;

        public FilmTriviaController(IFilmTriviaService filmTriviaService)
        {
            _filmTriviaService = filmTriviaService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse<GetFilmTriviaDto>>> GetAll(int id, [FromQuery] PaginationParameters parameters){
            return Ok(await _filmTriviaService.GetAllForFilm(id, parameters));
        }

        [HttpGet("{triviaId}")]
        public async Task<ActionResult<GetFilmTriviaDto>> GetSingle(int id, int triviaId){
            var trivia = await _filmTriviaService.GetById(triviaId);
            return Ok(trivia);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<GetFilmTriviaDto>> AddFilmTrivia(int id, AddFilmTriviaDto newFilmTrivia)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _filmTriviaService.Add(id ,userId, newFilmTrivia));
        }

        [Authorize]
        [HttpPut("{triviaId}")]
        public async Task<ActionResult<GetFilmTriviaDto>> UpdateFilmTrivia(int id, int triviaId, UpdateFilmTriviaDto updatedFilmTrivia){
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _filmTriviaService.Update(triviaId, userId ,updatedFilmTrivia));
        }

        [Authorize]
        [HttpDelete("{triviaId}")]
        public ActionResult DeleteFilmTrivia(int id, int triviaId){
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            _filmTriviaService.Delete(triviaId,userId);
            return Ok();
        }
    }
}