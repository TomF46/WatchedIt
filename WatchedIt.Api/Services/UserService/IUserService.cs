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
        Task<List<GetSimpleFilmDto>> GetWatchedFilms(int id);
        Task<GetUserDto> AddWatchedFilm(int id, AddWatchedFilmDto watchedFilm);
        Task<GetUserDto> RemoveWatchedFilm(int id, RemoveWatchedFilmDto watchedFilm);
    }
}