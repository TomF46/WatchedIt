using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Games.Connections;

namespace WatchedIt.Api.Services.Games.Connections
{
    public interface IConnectionsGameService
    {
        Task<PaginationResponse<GetConnectionsGameDto>> GetAllForUser(int userId, PaginationParameters parameters);
        Task<GetConnectionsGameDto> GetById(int id, int userId);
        Task<GetConnectionsGameDto> StartGame(int userId);
        Task<GetConnectionsGameDto> Guess(int gameId, int userId, GuessPersonForConnectionGameDto guess);
        Task<GetConnectionsGameDto> Forfeit(int gameId, int userId);
    }
}