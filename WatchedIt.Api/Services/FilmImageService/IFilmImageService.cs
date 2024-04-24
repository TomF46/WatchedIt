using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Files;

namespace WatchedIt.Api.Services.FilmImageService
{
    public interface IFilmImageService
    {
        Task<PaginationResponse<GetImageDto>> GetImages(int filmId, PaginationParameters parameters);
        Task<GetImageDto> Add(int filmId, AddImageDto newFilmImage);
        void Delete(int id);
    }
}