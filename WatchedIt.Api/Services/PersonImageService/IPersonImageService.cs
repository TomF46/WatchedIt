using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Files;

namespace WatchedIt.Api.Services.PersonImageService
{
    public interface IPersonImageService
    {
        Task<PaginationResponse<GetImageDto>> GetImages(int personId, PaginationParameters parameters);
        Task<GetImageDto> Add(int filmId, AddImageDto newPersonImage);
        void Delete(int id);
    }
}