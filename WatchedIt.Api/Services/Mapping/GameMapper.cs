using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.Games.Connections;
using WatchedIt.Api.Models.Games.GuessFilmFromCast;
using WatchedIt.Api.Models.Games.GuessFilmFromDescription;

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
                GameStatus.CompletedLimit => "Limit reached",
                _ => throw new BadRequestException("Request returned invalid status")
            };
        }

         public static string MapGameRoundStatusText(GameRoundStatus status){
            return status switch{
                GameRoundStatus.InProgress => "In progress",
                GameRoundStatus.CompletedSuccess => "Correct",
                GameRoundStatus.CompletedFail => "Incorrect",
                _ => throw new BadRequestException("Request returned invalid status")
            };
        }

        public static GetGuessFilmFromDescriptionGameDto MapGuessFilmFromDescriptionGame(GuessFilmFromDescriptionGame game){
            return new GetGuessFilmFromDescriptionGameDto{
                Id = game.Id,
                Score = game.Score,
                Rounds = game.Rounds.Select(r => MapGuessFilmFromDescriptionRound(r)).ToList(),
                Status = game.Status,
                StatusText = MapGameStatusText(game.Status),
                CreatedDate = game.CreatedDate,
                UpdatedDate = game.UpdatedDate
            };
        }

        public static GetGuessFilmFromDescriptionRoundDto MapGuessFilmFromDescriptionRound(GuessFilmFromDescriptionRound round){
            return new GetGuessFilmFromDescriptionRoundDto{
                Id = round.Id,
                Clue = MapGuessFilmFromDescriptionRoundClue(round),
                Status = round.Status,
                StatusText = MapGameRoundStatusText(round.Status)
            };
        }

        public static GetGuessFilmFromDescriptionRoundClueDto MapGuessFilmFromDescriptionRoundClue(GuessFilmFromDescriptionRound round){
            return new GetGuessFilmFromDescriptionRoundClueDto{
                Name = round.Status == GameRoundStatus.CompletedSuccess ? round.Film.Name : null,
                Description = round.Film.FullDescription
            };
        }

        public static GetGuessFilmFromDescriptionLeaderboardEntryDto MapGuessFilmFromDescriptionLeaderboardEntry(GuessFilmFromDescriptionGame game){
            return new GetGuessFilmFromDescriptionLeaderboardEntryDto{
                Id = game.Id,
                Score = game.Score,
                User = UserMapper.MapSimpleUser(game.User),
                UpdatedDate = game.UpdatedDate
            };
        }

        public static GetConnectionsGameDto MapConnectionsGame(ConnectionsGame game){
            return new GetConnectionsGameDto{
                Id = game.Id,
                Clues = game.Clues.Select(c => CreditMapper.Map(c.Credit)).ToList(),
                Person = game.Status == GameStatus.CompletedSuccess ? PersonMapper.MapSimple(game.Person) : null,
                Status = game.Status,
                StatusText = MapGameStatusText(game.Status),
                CreatedDate = game.CreatedDate,
                UpdatedDate = game.UpdatedDate
            };
        }
    }
}