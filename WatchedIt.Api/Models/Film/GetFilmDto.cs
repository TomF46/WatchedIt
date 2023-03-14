using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.Film
{
    public class GetFilmDto
    {
        public int Id {get;set;}
        public string? Name {get;set;}
        public string? ShortDescription {get;set;}
        public string? FullDescription {get;set;}
        public int Runtime {get;set;}
    }
}