using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.FilmModels;

namespace WatchedIt.Api.Models.FilmListModels
{
    public class FilmList
    {
        public int Id {get;set;}
        [Required]
        [StringLength(60, ErrorMessage = "List name can't be longer than 60 characters.")]
        public string? Name {get; set;}
        [StringLength(400, ErrorMessage = "Description can't be longer than 400 characters.")]
        public string? Description {get; set;}
        public User CreatedBy {get; set;}
        public ICollection<Film> Films { get; set; } = new List<Film>();
    }
}