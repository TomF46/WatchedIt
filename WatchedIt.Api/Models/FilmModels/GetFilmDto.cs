using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.CreditModels;

namespace WatchedIt.Api.Models.FilmModels
{
    public class GetFilmDto
    {
        public int Id {get;set;}
        public string? Name {get;set;}
        public string? ShortDescription {get;set;}
        public string? FullDescription {get;set;}
        public int Runtime {get;set;}
        public ICollection<GetCreditForFilmDto> Credits { get; set; } = new List<GetCreditForFilmDto>();
        public bool IsWatchedByUser {get; set;} = false;
    }
}