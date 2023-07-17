using WatchedIt.Api.Models.Games.GuessFilmFromCast;

namespace WatchedIt.Api.Services.Mapping
{
    public static class GameMapper
    {
        public static GetGuessFilmFromCastGameDto MapGuessFilmFromCastGame(GuessFilmFromCastGame game){
            return new GetGuessFilmFromCastGameDto{
                Id = game.Id,
                Clues = game.Clues.Select(c => PersonMapper.MapSimple(c)).ToList(),
                Status = game.Status,
                CreatedDate = game.CreatedDate,
                UpdatedDate = game.UpdatedDate
            };
        }
    }
}