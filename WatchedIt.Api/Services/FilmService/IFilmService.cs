using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Film;

namespace WatchedIt.Api.Services.FilmService
{
    public interface IFilmService
    {
        Task<List<GetFilmDto>> GetAll();
        Task<GetFilmDto> GetById(int id);
        Task<GetFilmDto> Add(AddFilmDto newFilm);
        Task<GetFilmDto> Update(int id ,UpdateFilmDto updatedFilm);
        void Delete(int id);

    }
}