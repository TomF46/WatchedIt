using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Util;
using Microsoft.Extensions.Options;
using WatchedIt.Api.Models.Configuration;
using WatchedIt.Api.Models.Files;
using WatchedIt.Api.Models.Enums;


namespace WatchedIt.Api.Services.File
{
    public class S3FileService : IFileService
    {
        private readonly IAmazonS3 _s3Client;
        private readonly AWSConfiguration _awsConfig;
        private readonly WatchedItContext _context;


        public S3FileService(IAmazonS3 s3Client, IOptions<AWSConfiguration> awsConfig, WatchedItContext context)
        {
            _s3Client = s3Client;
            _awsConfig = awsConfig.Value;
            _context = context;

        }
        public async Task<FileResponse> Upload(int userId, IFormFile file, string? prefix)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user is null) throw new Exceptions.UnauthorizedAccessException("User can't upload files");

            var bucketName = _awsConfig.BucketName;
            var bucketExists = await AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, bucketName);
            if (!bucketExists) throw new NotFoundException($"Bucket {bucketName} does not exist.");
            var filename = Guid.NewGuid();
            var key = string.IsNullOrEmpty(prefix) ? file.FileName : $"{prefix?.TrimEnd('/')}/{filename}";
            var request = new PutObjectRequest()
            {
                BucketName = bucketName,
                Key = key,
                InputStream = file.OpenReadStream()
            };
            request.Metadata.Add("Content-Type", file.ContentType);
            await _s3Client.PutObjectAsync(request);
            return new FileResponse
            {
                Url = GetFullUrl(bucketName, key)
            };
        }

        private string GetFullUrl(string bucketName, string key)
        {
            return $"https://{bucketName}.s3.{_awsConfig.Region}.amazonaws.com/{key}";
        }
    }
}