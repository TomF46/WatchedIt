using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Util;
using WatchedIt.Api.Models.Files;

namespace WatchedIt.Api.Services.File
{
    public class S3FileService : IFileService
    {
        private readonly IAmazonS3 _s3Client;
        private readonly IConfiguration _config;

        public S3FileService(IAmazonS3 s3Client, IConfiguration config)
        {
            _s3Client = s3Client;
            _config = config;
        }
        public async Task<FileResponse> Upload(IFormFile file, string? prefix)
        {
            var bucketName = _config["AWS:BucketName"];
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
            return new FileResponse{
                Url = getFullUrl(bucketName ,key)
            };
        }

        private string getFullUrl(string bucketName, string key){
            return $"https://{bucketName}.s3.{_config["AWS:Region"]}.amazonaws.com/{key}";
        }
    }
}