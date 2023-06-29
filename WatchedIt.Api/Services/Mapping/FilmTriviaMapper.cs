using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmTrivia;

namespace WatchedIt.Api.Services.Mapping
{
    public class FilmTriviaMapper
    {
        public static GetFilmTriviaDto Map(FilmTrivia filmTrivia)
        {
            return new GetFilmTriviaDto{
                Id = filmTrivia.Id,
                User = UserMapper.Map(filmTrivia.User),
                Film = FilmMapper.MapSimple(filmTrivia.Film),
                Text = filmTrivia.Text
            };
        }
    }
}