using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.FilmModels;

namespace WatchedIt.Api.Models.FilmTrivia
{
    public class FilmTrivia
    {
        public int Id { get; set; }
        [Required]
        public Film? Film {get; set;}
        public User? User {get; set;}
        [Required]
        [StringLength(1000, ErrorMessage = "Text can't be longer than 1000 characters.")]
        public string? Text {get; set;}
    }
}