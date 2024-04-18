using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.News;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Models.UserModels;

namespace WatchedIt.Api.Services.UserService
{
    public interface IUserService
    {
        Task<PaginationResponse<GetUserOverviewDto>> GetAll(UserSearchWithPaginationParameters parameters);
        Task<GetUserDto> GetById(int id);
        Task<GetUserDto> Update(int id, UpdateUserDto updatedUser);
        Task<PaginationResponse<GetFilmOverviewDto>> GetWatchedFilms(int id, FilmSearchWithPaginationParameters paginationParameters);
        Task<PaginationResponse<GetSimplePersonDto>> GetLikedPeople(int id, PaginationParameters paginationParameters);
        Task<GetIsAdminDto> GetIsUserAdmin(int id);
        Task<GetCanPublishDto> GetCanPublish(int id);
        Task<GetUserDto> SetUserCanPublish(int id, UserCanPublishDto canPublishDto);

    }
}