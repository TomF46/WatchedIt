using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.PersonModels
{
    public class GetSimplePersonDto
    {
        public int Id {get;set;}
        public string? FirstName {get;set;}
        public string? LastName {get;set;}
    }
}