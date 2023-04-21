using System.ComponentModel.DataAnnotations;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.CreditModels;
using WatchedIt.Api.Models.FilmModels;

namespace WatchedIt.Api.Models.PersonModels
{
    public class Person
    {
        public int Id {get;set;}
        [Required]
        [StringLength(50, ErrorMessage = "First name can't be longer than 50 characters.")]
        public string? FirstName {get;set;}
        [Required]
        [StringLength(50, ErrorMessage = "Last name can't be longer than 50 characters.")]
        public string? LastName {get;set;}
        [StringLength(80, ErrorMessage = "Middle names can't be longer than 80 characters.")]
        public string? MiddleNames {get;set;}
        [StringLength(50, ErrorMessage = "Stage names can't be longer than 50 characters.")]
        public string? StageName {get;set;}
        public DateTime DateOfBirth {get; set;}
        [StringLength(800, ErrorMessage = "Description can't be longer than 800 characters.")]
        public string? Description {get;set;}
        public string? ImageUrl {get;set;}
        public ICollection<Credit> Credits { get; set; } = new List<Credit>();
        public ICollection<User> LikedBy { get; set; } = new List<User>();

    }
}