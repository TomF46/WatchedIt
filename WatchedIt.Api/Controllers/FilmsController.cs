using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Services.FilmService;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilmsController : ControllerBase
    {
        private readonly IFilmService _filmService;

        public FilmsController(IFilmService filmService)
        {
            _filmService = filmService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GetFilmOverviewDto>>> Get([FromQuery] PaginationParameters paginationParameters){
            return Ok(await _filmService.GetAll(paginationParameters));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetFilmDto>> GetSingle(int id){
            var film = await _filmService.GetById(id);
            return Ok(film);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<GetFilmOverviewDto>> AddFilm(AddFilmDto newFilm)
        {
            return Ok(await _filmService.Add(newFilm));
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<GetFilmOverviewDto>> UpdateFilm(int id, UpdateFilmDto updatedFilm){
            return Ok(await _filmService.Update(id, updatedFilm));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult DeleteFilm(int id){
            _filmService.Delete(id);
            return Ok();
        }
    }
}