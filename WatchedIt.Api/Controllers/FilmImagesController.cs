using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using WatchedIt.Api.Models.Files;
using WatchedIt.Api.Services.FilmImageService;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/Films/{id}/images")]
    public class FilmImagesController : ControllerBase
    {
        private readonly IFilmImageService _filmImageService;

        public FilmImagesController(IFilmImageService filmImageService)
        {
            _filmImageService = filmImageService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse<GetFilmImageDto>>> GetAll(int id, [FromQuery] PaginationParameters parameters)
        {
            return Ok(await _filmImageService.GetImages(id, parameters));
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<GetFilmImageDto>> AddFilmImage(int id, AddFilmImageDto newFilmImage)
        {
            return Ok(await _filmImageService.Add(id, newFilmImage));
        }

        [Authorize]
        [HttpDelete("{imageId}")]
        public ActionResult DeleteFilmImage(int imageId)
        {
            _filmImageService.Delete(imageId);
            return Ok();
        }
    }
}