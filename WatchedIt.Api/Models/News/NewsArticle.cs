using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Authentication;

namespace WatchedIt.Api.Models.News
{
    public class NewsArticle
    {
        public int Id { get; set; }
        [Required]
        public User? User {get; set;}
        [StringLength(80, ErrorMessage = "Title can't be longer than 80 characters.")]
        public string? Title {get; set;}
        [StringLength(8000, ErrorMessage = "Content can't be longer than 8000 characters.")]
        public string? Content {get; set;}
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }  
        public bool Published {get; set;} = false;
    }
}