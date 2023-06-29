using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmTrivia;

namespace WatchedIt.Api.Services.FilmTriviaService
{
    public interface IFilmTriviaService
    {
        Task<PaginationResponse<GetFilmTriviaDto>> GetAllForFilm(int id, PaginationParameters parameters);
        Task<GetFilmTriviaDto> GetById(int id);
        Task<GetFilmTriviaDto> Add(int filmId, int userId, AddFilmTriviaDto newFilmTrivia);
        Task<GetFilmTriviaDto> Update(int id, int userId ,UpdateFilmTriviaDto updatedFilmTrivia);
        void Delete(int id, int userId);
    }
}