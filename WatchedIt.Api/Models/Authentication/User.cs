using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.FilmListModels;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Models.ReviewModels;

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
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public Role Role {get; set;} =  Role.User;
        public ICollection<FilmList> Lists {get;set;} = new List<FilmList>();
        public string? ImageUrl {get;set;}
        [StringLength(400, ErrorMessage = "Biography can't be longer than 400 characters.")]
        public string? Biography {get;set;}
        public ICollection<Person> Likes { get; set; } = new List<Person>();
    }
}