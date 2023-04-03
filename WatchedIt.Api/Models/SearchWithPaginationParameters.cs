using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models
{
    public class SearchWithPaginationParameters : PaginationParameters
    {
        public string? SearchTerm {get; set;} = "";
    }
}