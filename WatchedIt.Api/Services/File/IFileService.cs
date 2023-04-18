using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Files;

namespace WatchedIt.Api.Services.File
{
    public interface IFileService
    {
        Task<FileResponse> Upload(IFormFile file, string? prefix);
    }
}