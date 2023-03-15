using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.PersonModels
{
    public class GetPersonOverviewDto
    {
        public int Id {get;set;}
        public string? FirstName {get;set;}
        public string? LastName {get;set;}
        public string? MiddleNames {get;set;}
        public string? StageName {get;set;}
        public int Age {get;set;}
        public string? Description {get;set;}
    }
}