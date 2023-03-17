using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Services.FilmService;

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
        public async Task<ActionResult<List<GetFilmOverviewDto>>> Get(){
            return Ok(await _filmService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetFilmDto>> GetSingle(int id){
            var film = await _filmService.GetById(id);
            return Ok(film);
        }

        [HttpPost]
        public async Task<ActionResult<GetFilmOverviewDto>> AddFilm(AddFilmDto newFilm)
        {
            return Ok(await _filmService.Add(newFilm));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GetFilmOverviewDto>> UpdateFilm(int id, UpdateFilmDto updatedFilm){
            return Ok(await _filmService.Update(id, updatedFilm));
        }

        
        [HttpDelete("{id}")]
        public ActionResult DeleteFilm(int id){
            _filmService.Delete(id);
            return Ok();
        }

        // [HttpGet("watched/{id}")]
        // public async Task<ActionResult<GetSimplePersonDto>> GetWatchedFilms(int id)
        // {
        //     return Ok(await _personService.GetWatchedFilms(id));
        // }
    }
}