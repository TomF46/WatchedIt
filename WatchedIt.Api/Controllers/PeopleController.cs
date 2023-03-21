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
        public async Task<ActionResult<List<GetPersonOverviewDto>>> Get([FromQuery] PaginationParameters paginationParameters){
            return Ok(await _personService.GetAll(paginationParameters));
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
    }
}