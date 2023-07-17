using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Models.Games.GuessFilmFromCast
{
    public class GetGuessFilmFromCastGameDto
    {
        public int Id {get; set;}
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }    
        public ICollection<GetSimplePersonDto> Clues { get; set; } = new List<GetSimplePersonDto>();
        public GameStatus Status {get; set;}
    }
}