using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.PersonModels
{
    public class AddPersonDto
    {
        public string? FirstName {get;set;}
        public string? LastName {get;set;}
        public string? MiddleNames {get;set;}
        public string? StageName {get;set;}
        public DateTime DateOfBirth {get; set;}
        public string? Description {get;set;}
        public string? ImageUrl {get;set;}

    }
}