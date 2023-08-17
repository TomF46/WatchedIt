using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Games.GuessFilmFromDescription;

namespace WatchedIt.Api.Services.Games.GuessFilmFromDescription
{
    public interface IGuessFilmFromDescriptionGameService
    {
        Task<PaginationResponse<GetGuessFilmFromDescriptionGameDto>> GetAllForUser(int userId, PaginationParameters parameters);
        Task<GetGuessFilmFromDescriptionGameDto> GetById(int id, int userId);
        Task<GetGuessFilmFromDescriptionGameDto> StartGame(int userId);
        Task<GetGuessFilmFromDescriptionGameDto> Guess(int gameId, int userId, GuessFilmFromDescriptionGameGuessDto guess);
        Task<GetGuessFilmFromDescriptionGameDto> Forfeit(int gameId, int userId);
        Task<PaginationResponse<GetGuessFilmFromDescriptionLeaderboardEntryDto>> GetLeaderboard(PaginationParameters parameters);
    }
}