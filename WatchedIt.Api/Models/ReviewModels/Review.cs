using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.FilmModels;

namespace WatchedIt.Api.Models.ReviewModels
{
    public class Review
    {
        public int Id { get; set; }
        [Required]
        public User? User {get; set;}
        [Required]
        public Film? Film {get; set;}
        [Required]
        [Range(0, 10, ErrorMessage = "Value for {0} must be between {1} and {2}.")]
        public double Rating {get; set;}
        [StringLength(8000, ErrorMessage = "Text can't be longer than 8000 characters.")]
        public string? Text {get; set;}
    }
}