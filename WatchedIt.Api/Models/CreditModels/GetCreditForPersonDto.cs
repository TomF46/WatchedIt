using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.FilmModels;

namespace WatchedIt.Api.Models.CreditModels
{
    public class GetCreditForPersonDto
    {
        public int Id {get;set;}
        public GetSimpleFilmDto? Film {get;set;}
        public string? Role {get;set;}
        public CreditType Type {get;set;}
    }
}