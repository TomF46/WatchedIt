using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.Games.GuessFilmFromCast;

namespace WatchedIt.Api.Services.Mapping
{
    public static class GameMapper
    {
        public static GetGuessFilmFromCastGameDto MapGuessFilmFromCastGame(GuessFilmFromCastGame game){
            return new GetGuessFilmFromCastGameDto{
                Id = game.Id,
                Clues = game.Clues.Select(c => PersonMapper.MapSimple(c)).ToList(),
                Film = game.Status == GameStatus.CompletedSuccess ? FilmMapper.MapSimple(game.Film) : null,
                Status = game.Status,
                StatusText = MapGameStatusText(game.Status),
                CreatedDate = game.CreatedDate,
                UpdatedDate = game.UpdatedDate
            };
        }

        public static string MapGameStatusText(GameStatus status){
            return status switch{
                GameStatus.InProgress => "In progress",
                GameStatus.CompletedSuccess => "Completed",
                GameStatus.CompletedFail => "Failed",
                GameStatus.Forfeit => "Forfeited",
                _ => throw new BadRequestException("Request returned invalid status")
            };
        }
    }
}