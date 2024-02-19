using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.FilmModels;

namespace WatchedIt.Api.Services.Mapping
{
    public static class FilmMapper
    {
        public static GetFilmDto Map(Film film)
        {
            return new GetFilmDto
            {
                Id = film.Id,
                Name = film.Name,
                ShortDescription = film.ShortDescription,
                FullDescription = film.FullDescription,
                Runtime = film.Runtime,
                ReleaseDate = film.ReleaseDate,
                PosterUrl = film.PosterUrl,
                TrailerUrl = film.TrailerUrl,
                AverageRating = string.Format("{0:0.0}", film.AverageRating),
                Credits = CreditMapper.MapFilmCastCrewCreditDto(film.Credits.ToList()),
                Categories = film.Categories.Select(x => CategoryMapper.Map(x)).ToList(),
                WatchedByCount = film.WatchedBy.Count
            };
        }

        public static GetFilmOverviewDto MapOverview(Film film)
        {
            return new GetFilmOverviewDto
            {
                Id = film.Id,
                Name = film.Name,
                ShortDescription = film.ShortDescription,
                PosterUrl = film.PosterUrl,
                AverageRating = string.Format("{0:0.0}", film.AverageRating),
                WatchedByCount = film.WatchedBy.Count
            };
        }

        public static GetSimpleFilmDto MapSimple(Film film)
        {
            return new GetSimpleFilmDto
            {
                Id = film.Id,
                Name = film.Name,
                PosterUrl = film.PosterUrl
            };
        }

        public static Film MapForAdding(AddFilmDto newFilm)
        {
            return new Film
            {
                Name = newFilm.Name,
                ShortDescription = newFilm.ShortDescription,
                FullDescription = newFilm.FullDescription,
                Runtime = newFilm.Runtime,
                ReleaseDate = newFilm.ReleaseDate,
                PosterUrl = newFilm.PosterUrl,
                TrailerUrl = newFilm.TrailerUrl
            };
        }
    }
}