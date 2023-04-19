using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Files;

namespace WatchedIt.Api.Services.File
{
    public class DiskFileService : IFileService
    {
        private readonly IConfiguration _config;

        public DiskFileService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<FileResponse> Upload(IFormFile file, string? prefix)
        {
            var fileName = $"{Guid.NewGuid().ToString()}{file.FileName}";
            var folderName = Path.Combine("Resources", "Images");
            var path = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            if (file.Length > 0)
            {
                var fullPath = Path.Combine(path, fileName);
                var dbPath = Path.Combine(folderName, fileName);
                await using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }
                return new FileResponse{
                    Url = $"{_config["ApplicationUrl"]}/{dbPath}"
                };
            }
            else
            {
                throw new BadRequestException("Invalid file");
            }
        }
    }
}