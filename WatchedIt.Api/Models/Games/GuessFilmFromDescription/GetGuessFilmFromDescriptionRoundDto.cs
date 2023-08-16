using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Enums;

namespace WatchedIt.Api.Models.Games.GuessFilmFromDescription
{
    public class GetGuessFilmFromDescriptionRoundDto
    {
        public int Id {get; set;}
        public GetGuessFilmFromDescriptionRoundClueDto Clue { get; set;}
        public GameStatus Status {get; set;}
        public string StatusText {get; set;}
    }

    public class GetGuessFilmFromDescriptionRoundClueDto
    {
        public string? Name {get; set;} // Null If not guessed 
        public string Description {get; set;}
    }
}