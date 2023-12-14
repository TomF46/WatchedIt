using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.UserModels
{
    public class GetUserOverviewDto
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public int WatchedFilmCount { get; set; }
        public int ReviewCount { get; set; }
        public int NewsArticleCount { get; set; }
        public string? ImageUrl { get; set; }
    }
}