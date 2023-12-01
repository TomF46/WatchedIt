using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models
{
    public class NewsArticleSearchWithPaginationParameters : PaginationParameters
    {
        public string? Title {get; set;} = "";
        public bool? IncludeUnpublished = false;
    }
}