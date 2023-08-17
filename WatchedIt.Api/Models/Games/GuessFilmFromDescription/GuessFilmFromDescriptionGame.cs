using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.Enums;

namespace WatchedIt.Api.Models.Games.GuessFilmFromDescription
{
    public class GuessFilmFromDescriptionGame
    {
        public int Id {get;set;}
        [Required]
        public User? User {get; set;}
        public int Score {get; set;} = 0;
        public GameStatus Status {get; set;} = GameStatus.InProgress;
        public ICollection<GuessFilmFromDescriptionRound> Rounds { get; set; } = new List<GuessFilmFromDescriptionRound>();
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }   
    }
}