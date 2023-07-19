using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Models.Games.GuessFilmFromCast
{
    public class GetGuessFilmFromCastGameDto
    {
        public int Id {get; set;}
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }    
        public ICollection<GetSimplePersonDto> Clues { get; set; } = new List<GetSimplePersonDto>();
        public GetSimpleFilmDto? Film {get; set;} // Null unless user has correctly guessed
        public GameStatus Status {get; set;}
        public string StatusText {get; set;}
    }
}