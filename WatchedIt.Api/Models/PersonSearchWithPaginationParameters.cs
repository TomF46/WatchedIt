using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models
{
    public class PersonSearchWithPaginationParameters : PaginationParameters
    {
        public string? FirstName {get; set;} = "";
        public string? LastName {get; set;} = "";
        public string? StageName {get; set;} = "";
        public string? Sort {get; set;} = "";

    }
}