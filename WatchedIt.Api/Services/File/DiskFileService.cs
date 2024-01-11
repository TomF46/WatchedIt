using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.Extensions.Options;

using WatchedIt.Api.Models.Configuration;
using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.Files;

namespace WatchedIt.Api.Services.File
{
    public class DiskFileService : IFileService
    {
        private readonly ImagesConfiguration _imagesConfig;
        private readonly WatchedItContext _context;

        public DiskFileService(IOptions<ImagesConfiguration> imagesConfig, WatchedItContext context)
        {
            _imagesConfig = imagesConfig.Value;
            _context = context;
        }

        public async Task<FileResponse> Upload(int userId, IFormFile file, string? prefix)
        {
            // Todo do permissions outside of the function
            var user = await _context.Users.FindAsync(userId);
            if (user is null) throw new Exceptions.UnauthorizedAccessException("User can't upload files");

            var fileName = $"{Guid.NewGuid().ToString()}{file.FileName}";
            if (!string.IsNullOrEmpty(prefix)) fileName = $"{prefix}/{fileName}";
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
                return new FileResponse
                {
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