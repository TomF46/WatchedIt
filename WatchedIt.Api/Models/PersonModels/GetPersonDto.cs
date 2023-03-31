using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.CreditModels;
using WatchedIt.Api.Models.FilmModels;

namespace WatchedIt.Api.Models.PersonModels
{
    public class GetPersonDto
    {
        public int Id {get;set;}
        public string? FirstName {get;set;}
        public string? LastName {get;set;}
        public string? MiddleNames {get;set;}
        public string? StageName {get;set;}
        public string? FullName {get;set;}
        public int Age {get;set;}
        public string? Description {get;set;}
        public string? ImageUrl {get;set;}
        public GetPersonCastCrewCreditsDto Credits { get; set; }
    }
}