using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models
{
    public class ReviewSearchWithPaginationParameters : PaginationParameters
    {
        public string? Sort { get; set; } = "";
    }
}