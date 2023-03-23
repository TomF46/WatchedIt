using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.UserModels;

namespace WatchedIt.Api.Services.UserService
{
    public interface IUserService
    {
        Task<GetUserDto> GetById(int id);
        Task<List<GetSimpleFilmDto>> GetWatchedFilms(int id, PaginationParameters paginationParameters);
        Task<GetIsAdminDto> GetIsUserAdmin(int id);
    }
}