using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Files;

namespace WatchedIt.Api.Services.FilmImageService
{
    public interface IFilmImageService
    {
        Task<PaginationResponse<GetFilmImageDto>> GetImages(int filmId, PaginationParameters parameters);
        Task<GetFilmImageDto> Add(int filmId, AddFilmImageDto newFilmImage);
        void Delete(int id);
    }
}