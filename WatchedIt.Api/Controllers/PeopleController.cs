using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Services.Likes;
using WatchedIt.Api.Services.Mapping;
using WatchedIt.Api.Services.PersonService;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeopleController : ControllerBase
    {
        public IPersonService _personService { get; }
        private readonly ILikesService _likesService;
        public PeopleController(IPersonService personService, ILikesService likesService)
        {
            _likesService = likesService;
            _personService = personService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse<GetPersonOverviewDto>>> Get([FromQuery] PersonSearchWithPaginationParameters parameters){
            return Ok(await _personService.GetAll(parameters));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetPersonDto>> GetSingle(int id){
            var person = await _personService.GetById(id);
            if(!HttpContext.User.Identity.IsAuthenticated) return Ok(person);
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            person.IsLikedByUser = await _likesService.CurrentUserLikesPersonWithId(person.Id, userId);
            return Ok(person);
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<ActionResult<GetPersonOverviewDto>> AddPerson(AddPersonDto newPerson)
        {
            return Ok(await _personService.Add(newPerson));
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<ActionResult<GetPersonOverviewDto>> UpdatePerson(int id, UpdatePersonDto updatedPerson){
            return Ok(await _personService.Update(id, updatedPerson));
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public ActionResult DeletePerson(int id){
            _personService.Delete(id);
            return Ok();
        }
    }
}