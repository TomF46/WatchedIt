using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.FilmModels;

namespace WatchedIt.Api.Models.Games.GuessFilmFromDescription
{
    public class GuessFilmFromDescriptionRound
    {
        public int Id {get; set;}
        [Required]
        public Film? Film {get; set;}
        public GameRoundStatus Status {get; set;} = GameRoundStatus.InProgress;
    }
}