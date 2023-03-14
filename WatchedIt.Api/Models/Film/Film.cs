using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.Film
{
    public class Film
    {
        public int Id {get;set;}
        [Required]
        [StringLength(60, ErrorMessage = "Name can't be longer than 60 characters.")]
        public string? Name {get;set;}
        [StringLength(200, ErrorMessage = "Short description can't be longer than 200 characters.")]
        public string? ShortDescription {get;set;}
        [StringLength(800, ErrorMessage = "Full description can't be longer than 800 characters.")]
        public string? FullDescription {get;set;}
        public int Runtime {get;set;}
    }
}