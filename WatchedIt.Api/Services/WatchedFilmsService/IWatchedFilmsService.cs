using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.UserModels;

namespace WatchedIt.Api.Services.WatchedFilmsService
{
    public interface IWatchedFilmsService
    {
        Task<bool> CurrentUserHasWatchedFilmWithId(int id, int userId);
        Task<GetHasWatchedFilmDto> AddWatchedFilm(int id, AddWatchedFilmDto watchedFilm);
        Task<GetHasWatchedFilmDto> RemoveWatchedFilm(int id, int filmId);
    }
}