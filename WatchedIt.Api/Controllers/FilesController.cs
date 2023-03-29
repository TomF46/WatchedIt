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

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilesController : ControllerBase
    {
        private readonly IS3FileService _s3FileService;
        public FilesController(IS3FileService s3FileService)
        {
            _s3FileService = s3FileService;
        }

        [HttpPost("upload")]
        public async Task<ActionResult<S3FileResponse>> UploadFileAsync(IFormFile file, string? prefix)
        {
            return Ok(await _s3FileService.Upload(file, prefix));
        }

        // [HttpGet("get-by-key")]
        // public async Task<IActionResult> GetFileByKeyAsync(string key)
        // {
        //     return Ok(await _s3FileService.GetFileUrl(key));
        // }
    }
}