using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Services.FilmService;
using WatchedIt.Api.Services.Mapping;
using WatchedIt.Api.Services.WatchedFilmsService;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilmsController : ControllerBase
    {
        private readonly IFilmService _filmService;
        public readonly IWatchedFilmsService _watchedFilmService;

        public FilmsController(IFilmService filmService, IWatchedFilmsService watchedFilmService)
        {
            _watchedFilmService = watchedFilmService;
            _filmService = filmService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GetFilmOverviewDto>>> Get([FromQuery] FilmSearchWithPaginationParameters parameters){
            return Ok(await _filmService.GetAll(parameters));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetFilmDto>> GetSingle(int id){
            var film = await _filmService.GetById(id);
            if(!HttpContext.User.Identity.IsAuthenticated) return Ok(film);
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            film.IsWatchedByUser = await _watchedFilmService.CurrentUserHasWatchedFilmWithId(film.Id, userId);
            return Ok(film);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<ActionResult<GetFilmOverviewDto>> AddFilm(AddFilmDto newFilm)
        {
            return Ok(await _filmService.Add(newFilm));
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<ActionResult<GetFilmOverviewDto>> UpdateFilm(int id, UpdateFilmDto updatedFilm){
            return Ok(await _filmService.Update(id, updatedFilm));
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public ActionResult DeleteFilm(int id){
            _filmService.Delete(id);
            return Ok();
        }
    }
}