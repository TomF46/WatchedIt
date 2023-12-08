using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.News
{
    public class GetNewsArticleOverviewDto
    {
        public int Id { get; set; }
        public string? AuthorName { get; set; }
        public string? Title { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool Published { get; set; }
        public string? ThumbnailUrl { get; set; }
    }
}