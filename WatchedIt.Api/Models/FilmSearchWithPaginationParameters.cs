using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models
{
    public class FilmSearchWithPaginationParameters : PaginationParameters
    {
        public string? SearchTerm { get; set; } = "";
        public int? Category { get; set; }
        public string? Sort { get; set; } = "";
        public DateTime? ReleasedAfterDate { get; set; }
        public DateTime? ReleasedBeforeDate { get; set; }
        public int? MaxRating { get; set; }
        public int? MinRating { get; set; }

    }
}