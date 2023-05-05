using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Authentication;

namespace WatchedIt.Api.Models.CommentModels
{
    public class Comment
    {
        public int Id { get; set; }
        [Required]
        public User? User {get; set;}
        public string? Text {get; set;}
        [StringLength(600, ErrorMessage = "Text can't be longer than 600 characters.")]
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }    
    }
}