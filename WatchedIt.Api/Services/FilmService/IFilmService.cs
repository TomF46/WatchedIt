using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmModels;

namespace WatchedIt.Api.Services.FilmService
{
    public interface IFilmService
    {
        Task<List<GetFilmOverviewDto>> GetAll(FilmSearchWithPaginationParameters parameters);
        Task<GetFilmDto> GetById(int id);
        Task<GetFilmOverviewDto> Add(AddFilmDto newFilm);
        Task<GetFilmOverviewDto> Update(int id ,UpdateFilmDto updatedFilm);
        void Delete(int id);
    }
}