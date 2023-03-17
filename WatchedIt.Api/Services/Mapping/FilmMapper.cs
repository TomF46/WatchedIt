using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmModels;

namespace WatchedIt.Api.Services.Mapping
{
    public class FilmMapper
    {
        public static GetFilmDto Map(Film film){
            return new GetFilmDto{
                Id = film.Id,
                Name = film.Name,
                ShortDescription = film.ShortDescription,
                FullDescription = film.FullDescription,
                Runtime = film.Runtime,
                Credits = film.Credits.Select(c => CreditMapper.mapForFilm(c)).ToList()
            };
        }

        public static GetFilmOverviewDto MapOverview(Film film){
            return new GetFilmOverviewDto{
                Id = film.Id,
                Name = film.Name,
                ShortDescription = film.ShortDescription,
            };
        }

        public static GetSimpleFilmDto MapSimple(Film film){
            return new GetSimpleFilmDto{
                Id = film.Id,
                Name = film.Name
            };
        }

        public static Film MapForAdding(AddFilmDto newFilm){
            return new Film {
                Name = newFilm.Name,
                ShortDescription = newFilm.ShortDescription,
                FullDescription = newFilm.FullDescription,
                Runtime = newFilm.Runtime
            };
        }
    }
}