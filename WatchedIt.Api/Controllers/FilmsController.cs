using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.Film;
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
        public async Task<ActionResult<List<GetFilmDto>>> Get(){
            return Ok(await _filmService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetFilmDto>> GetSingle(int id){
            var film = await _filmService.GetById(id);

            if(film is null) throw new NotFoundException($"Film with Id '{id}' not found.");

            return Ok(film);
        }

        [HttpPost]
        public async Task<ActionResult<GetFilmDto>> AddFilm(AddFilmDto newFilm)
        {
            return Ok(await _filmService.Add(newFilm));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GetFilmDto>> UpdateFilm(int id, UpdateFilmDto updatedFilm){
            return Ok(await _filmService.Update(id, updatedFilm));
        }

        
        [HttpDelete("{id}")]
        public ActionResult DeleteFilm(int id){
            _filmService.Delete(id);
            return Ok();
        }
    }
}