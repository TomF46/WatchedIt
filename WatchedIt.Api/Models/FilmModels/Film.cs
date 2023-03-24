using System.ComponentModel.DataAnnotations;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.CreditModels;
using WatchedIt.Api.Models.FilmListModels;
using WatchedIt.Api.Models.ReviewModels;

namespace WatchedIt.Api.Models.FilmModels
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
        public DateTime ReleaseDate {get; set;}
        public string? PosterUrl {get;set;}
        public ICollection<Credit> Credits { get; set; } = new List<Credit>();
        public ICollection<User> WatchedBy { get; set; } = new List<User>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public ICollection<FilmList> OnLists {get;set;} = new List<FilmList>();
    }
}