using WatchedIt.Api.Models.Games.GuessFilmFromCast;

namespace WatchedIt.Api.Services.Games.GuessFilmFromCast
{
    public interface IGuessFilmFromCastGameService
    {
        Task<PaginationResponse<GetGuessFilmFromCastGameDto>> GetAllForUser(int userId, PaginationParameters parameters);
        Task<GetGuessFilmFromCastGameDto> GetById(int id, int userId);
        Task<GetGuessFilmFromCastGameDto> StartGame(int userId);
        Task<GetGuessFilmFromCastGameDto> Guess(int gameId, int userId, GuessFilmFromCastGameGuessDto guess);
    }
}