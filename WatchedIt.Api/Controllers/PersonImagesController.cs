using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using WatchedIt.Api.Models.Files;
using WatchedIt.Api.Services.PersonImageService;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/People/{id}/images")]
    public class PersonImagesController : ControllerBase
    {
        private readonly IPersonImageService _personImageService;

        public PersonImagesController(IPersonImageService personImageService)
        {
            _personImageService = personImageService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse<GetImageDto>>> GetAll(int id, [FromQuery] PaginationParameters parameters)
        {
            return Ok(await _personImageService.GetImages(id, parameters));
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<GetImageDto>> AddPersonImage(int id, AddImageDto newPersonImage)
        {
            return Ok(await _personImageService.Add(id, newPersonImage));
        }

        [Authorize]
        [HttpDelete("{imageId}")]
        public ActionResult DeletePersonImage(int imageId)
        {
            _personImageService.Delete(imageId);
            return Ok();
        }
    }
}