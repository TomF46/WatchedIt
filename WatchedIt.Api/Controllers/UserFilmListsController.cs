using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.FilmListModels;
using WatchedIt.Api.Services.FilmListService;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/Users/{id}/filmLists")]
    public class UserFilmListsController : ControllerBase
    {
        private readonly IFilmListService _filmListService;
        public UserFilmListsController(IFilmListService filmListService)
        {
            _filmListService = filmListService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse<GetFilmListOverviewDto>>> Get(int id, [FromQuery] PaginationParameters paginationParameters){
            return Ok(await _filmListService.GetAllByUser(id, paginationParameters));
        }
    }
}