using System.ComponentModel.DataAnnotations;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Models.Games.GuessFilmFromCast
{
    public class GuessFilmFromCastGame
    {
        public int Id {get;set;}
        [Required]
        public User? User {get; set;}
        [Required]
        public Film? Film {get; set;}
        public GameStatus Status {get; set;} = GameStatus.InProgress;
        public ICollection<Person> Clues { get; set; } = new List<Person>();
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }    
    }
}