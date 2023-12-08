using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.News
{
    public class GetNewsArticleDto
    {
        public int Id { get; set; }
        public AuthorDto? Author { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public string? ThumbnailUrl { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool Published { get; set; }
    }

    public class AuthorDto
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? ImageUrl { get; set; }
    }
}