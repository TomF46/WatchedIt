using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using WatchedIt.Api.Models.Configuration;
using WatchedIt.Api.Models.Files;

namespace WatchedIt.Api.Services.File
{
    public class DiskFileService : IFileService
    {
        private readonly ImagesConfiguration _imagesConfig;

        public DiskFileService(IOptions<ImagesConfiguration> imagesConfig)
        {
            _imagesConfig = imagesConfig.Value;
        }

        public async Task<FileResponse> Upload(IFormFile file, string? prefix)
        {
            var fileName = $"{Guid.NewGuid().ToString()}{file.FileName}";
            if(!string.IsNullOrEmpty(prefix)) fileName = $"{prefix}/{fileName}";
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
                    Url = $"{_imagesConfig.DiskRootUrl}/{dbPath}"
                };
            }
            else
            {
                throw new BadRequestException("Invalid file");
            }
        }
    }
}