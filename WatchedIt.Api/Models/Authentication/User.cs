using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmModels;

namespace WatchedIt.Api.Models.Authentication
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string? Username { get; set; }
        [Required]
        [EmailAddress]
        public string? Email {get;set;}
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
        public ICollection<Film> Watched { get; set; } = new List<Film>();
    }
}