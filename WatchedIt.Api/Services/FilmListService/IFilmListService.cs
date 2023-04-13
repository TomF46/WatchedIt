using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmListModels;

namespace WatchedIt.Api.Services.FilmListService
{
    public interface IFilmListService
    {
        Task<PaginationResponse<GetFilmListOverviewDto>> GetAll(FilmListSearchWithPaginationParameters parameters);
        Task<GetFilmListDto> GetById(int id, int userId);
        Task<GetFilmListOverviewDto> Add(int userId, AddFilmListDto newFilmList);
        Task<GetFilmListOverviewDto> Update(int id, int userId, UpdateFilmListDto updatedFilmList);
        void Delete(int id, int userId);
        Task<GetFilmListDto> AddFilmToListById(int id, int userId, AddFilmToFilmListDto newFilm);
        Task<GetFilmListDto> RemoveFilmFromListById(int id, int userId, RemoveFilmForFilmListDto filmToRemove);
        Task<PaginationResponse<GetFilmListOverviewDto>> GetAllByUser(int id, PaginationParameters paginationParameters);

    }
}