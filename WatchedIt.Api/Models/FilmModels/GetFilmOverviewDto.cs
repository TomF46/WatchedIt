using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.FilmModels
{
    public class GetFilmOverviewDto
    {
        public int Id {get;set;}
        public string? Name {get;set;}
        public string? ShortDescription {get;set;}
    }
}