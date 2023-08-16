using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Enums;

namespace WatchedIt.Api.Models.Games.GuessFilmFromDescription
{
    public class GetGuessFilmFromDescriptionGameDto
    {
        public int Id {get; set;}
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }    
        public ICollection<GetGuessFilmFromDescriptionRoundDto> Rounds { get; set; } = new List<GetGuessFilmFromDescriptionRoundDto>();
        public GameStatus Status {get; set;}
        public string StatusText {get; set;}
    }
}