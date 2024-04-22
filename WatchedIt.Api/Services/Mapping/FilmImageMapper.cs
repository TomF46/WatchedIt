using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Files;

namespace WatchedIt.Api.Services.Mapping
{
    public class FilmImageMapper
    {
        public static GetFilmImageDto Map(FilmImage image)
        {
            return new GetFilmImageDto
            {
                Id = image.Id,
                Url = image.Url,
            };
        }
    }
}