using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Util;

using Microsoft.AspNetCore.Mvc;

using WatchedIt.Api.Models.Files;
using WatchedIt.Api.Services.File;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilesController : ControllerBase
    {
        private readonly IFileService _fileService;
        public FilesController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost("upload")]
        public async Task<ActionResult<FileResponse>> UploadFileAsync(IFormFile file, string? prefix)
        {
            if (!HttpContext.User.Identity.IsAuthenticated) return Unauthorized();
            var isAdmin = HttpContext.User.IsInRole("Administrator");
            if (!isAdmin && prefix != "users") throw new Exceptions.UnauthorizedAccessException("User can't upload files to this location.");
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _fileService.Upload(userId, file, prefix));
        }
    }
}