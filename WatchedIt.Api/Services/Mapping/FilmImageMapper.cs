using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Files;

namespace WatchedIt.Api.Services.Mapping
{
    public class ImageMapper
    {
        public static GetImageDto Map(FilmImage image)
        {
            return new GetImageDto
            {
                Id = image.Id,
                Url = image.Url,
            };
        }

        public static GetImageDto Map(PersonImage image)
        {
            return new GetImageDto
            {
                Id = image.Id,
                Url = image.Url,
            };
        }
    }
}