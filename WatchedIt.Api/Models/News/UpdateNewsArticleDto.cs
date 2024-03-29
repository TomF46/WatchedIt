using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.News
{
    public class UpdateNewsArticleDto
    {
        public string? Title { get; set; }
        public string? Content { get; set; }
        public string? ThumbnailUrl { get; set; }
        public bool Published { get; set; }
    }
}