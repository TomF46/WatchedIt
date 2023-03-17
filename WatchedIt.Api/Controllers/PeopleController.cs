using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Services.PersonService;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeopleController : ControllerBase
    {
        public IPersonService _personService { get; }
        public PeopleController(IPersonService personService)
        {
            _personService = personService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GetPersonOverviewDto>>> Get(){
            return Ok(await _personService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetPersonDto>> GetSingle(int id){
            var person = await _personService.GetById(id);
            return Ok(person);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<GetPersonOverviewDto>> AddPerson(AddPersonDto newPerson)
        {
            return Ok(await _personService.Add(newPerson));
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<GetPersonOverviewDto>> UpdatePerson(int id, UpdatePersonDto updatedPerson){
            return Ok(await _personService.Update(id, updatedPerson));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult DeletePerson(int id){
            _personService.Delete(id);
            return Ok();
        }

        [HttpGet("watched/{id}")]
        public async Task<ActionResult<GetSimpleFilmDto>> GetWatchedFilms(int id)
        {
            return Ok(await _personService.GetWatchedFilms(id));
        }

        [HttpPost("watched/{id}")]
        public async Task<ActionResult<GetPersonDto>> AddWatchedFilm(int id, AddWatchedFilmDto watchedFilm)
        {
            return Ok(await _personService.AddWatchedFilm(id, watchedFilm));
        }

        [HttpDelete("watched/{id}")]
        public async Task<ActionResult<GetPersonDto>> RemoveWatchedFilm(int id, RemoveWatchedFilmDto removedFilm)
        {
            return Ok(await _personService.RemoveWatchedFilm(id, removedFilm));
        }
    }
}