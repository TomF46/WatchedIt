using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Models.CreditModels
{
    public class GetCreditForFilmDto
    {
        public int Id {get;set;}
        public GetSimplePersonDto? Person {get;set;}
        public string? Role {get;set;}
        public CreditType Type {get;set;}
    }
}