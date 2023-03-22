using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Services.Mapping;
using WatchedIt.Api.Services.WatchedFilmsService;

namespace WatchedIt.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/Users/me/watchedFilms")]
    public class WatchedFilmsController : ControllerBase
    {
        private readonly IWatchedFilmsService _watchedFilmsService;
        
        public WatchedFilmsController(IWatchedFilmsService watchedFilmsService)
        {
            _watchedFilmsService = watchedFilmsService;
        }

        [HttpPost]
        public async Task<ActionResult<GetHasWatchedFilmDto>> AddWatchedFilm(AddWatchedFilmDto watchedFilm)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _watchedFilmsService.AddWatchedFilm(userId, watchedFilm));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<GetHasWatchedFilmDto>> RemoveWatchedFilm(int id)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _watchedFilmsService.RemoveWatchedFilm(userId, id));
        }
    }
}