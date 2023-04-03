using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmModels;

namespace WatchedIt.Api.Models.CategoryModels
{
    public class Category
    {
        public int Id { get; set;}
        [Required]
        [StringLength(30, ErrorMessage = "Name can't be longer than 30 characters.")]
        public string Name { get; set;}
        public ICollection<Film> Films { get; set; } = new List<Film>();
        
    }
}