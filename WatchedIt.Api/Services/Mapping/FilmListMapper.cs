using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.FilmListModels;

namespace WatchedIt.Api.Services.Mapping
{
    public static class FilmListMapper
    {
        public static GetFilmListDto Map(FilmList filmList)
        {
            return new GetFilmListDto
            {
                Id = filmList.Id,
                Name = filmList.Name,
                Description = filmList.Description,
                CreatedBy = UserMapper.MapSimpleUser(filmList.CreatedBy)
            };
        }

        public static GetFilmListOverviewDto MapOverview(FilmList filmList)
        {
            var filmThumbnails = filmList.Films.Take(4).Select(x => x.PosterUrl).ToList();
            return new GetFilmListOverviewDto
            {
                Id = filmList.Id,
                Name = filmList.Name,
                Description = filmList.Description,
                CreatedBy = UserMapper.MapSimpleUser(filmList.CreatedBy),
                FilmCount = filmList.Films.Count,
                Thumbnails = filmThumbnails
            };
        }

        public static FilmList MapForAddition(AddFilmListDto newFilmList)
        {
            return new FilmList
            {
                Name = newFilmList.Name,
                Description = newFilmList.Description
            };
        }

        public static GetFilmListForEditDto MapForEdit(FilmList filmList)
        {
            return new GetFilmListForEditDto
            {
                Id = filmList.Id,
                Name = filmList.Name,
                Description = filmList.Description,
                CreatedBy = UserMapper.MapSimpleUser(filmList.CreatedBy),
                Films = filmList.Films.Select(f => FilmMapper.MapOverview(f)).ToList(),
            };
        }
    }
}