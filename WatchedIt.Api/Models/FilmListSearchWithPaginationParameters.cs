using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models
{
    public class FilmListSearchWithPaginationParameters : PaginationParameters
    {
        public string? SearchTerm {get; set;} = "";
        public string? Username {get; set;} = "";
        
    }
}