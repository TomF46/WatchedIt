using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.FilmModels
{
    public class GetSimpleFilmDto
    {
        public int Id {get;set;}
        public string? Name {get;set;}
        public string? PosterUrl {get;set;}
    }
}