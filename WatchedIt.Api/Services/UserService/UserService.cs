using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.News;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Models.UserModels;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly WatchedItContext _context;
        public UserService(WatchedItContext context)
        {
            _context = context;
        }

        public async Task<PaginationResponse<GetUserOverviewDto>> GetAll(UserSearchWithPaginationParameters parameters)
        {
            var query = _context.Users.Include(u => u.Watched).Include(u => u.Reviews).Include(u => u.Articles).AsQueryable();

            switch (parameters.Sort)
            {
                case "watched_desc":
                    query = query.OrderByDescending(x => x.Watched.Count());
                    break;
                case "watched_asc":
                    query = query.OrderBy(x => x.Watched.Count());
                    break;
                case "reviews_desc":
                    query = query.OrderByDescending(x => x.Reviews.Count());
                    break;
                case "reviews_asc":
                    query = query.OrderBy(x => x.Reviews.Count());
                    break;
                case "articles_desc":
                    query = query.OrderByDescending(x => x.Articles.Count());
                    break;
                case "articles_asc":
                    query = query.OrderBy(x => x.Articles.Count());
                    break;
                default:
                    query = query.OrderBy(x => x.Username);
                    break;
            }

            var count = query.Count();
            var users = await query.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize).ToListAsync();
            var mappedUsers = users.Select(u => UserMapper.MapOverview(u)).ToList();
            return new PaginationResponse<GetUserOverviewDto>(mappedUsers, parameters.PageNumber, parameters.PageSize, count);
        }

        public async Task<GetUserDto> GetById(int id)
        {
            var user = await _context.Users.Include(u => u.Watched).FirstOrDefaultAsync(u => u.Id == id);
            if (user is null) throw new NotFoundException($"user with Id '{id}' not found.");
            return UserMapper.Map(user);
        }

        public async Task<GetIsAdminDto> GetIsUserAdmin(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user is null) throw new NotFoundException($"user with Id '{id}' not found.");

            return new GetIsAdminDto
            {
                IsAdmin = user.Role == Role.Administrator
            };
        }

        public async Task<GetUserDto> Update(int id, UpdateUserDto updatedUser)
        {
            var user = await _context.Users.Include(f => f.Watched).FirstOrDefaultAsync(p => p.Id == id);
            if (user is null) throw new NotFoundException($"User with Id '{id}' not found.");
            user.ImageUrl = updatedUser.ImageUrl;
            user.Biography = updatedUser.Biography;
            await _context.SaveChangesAsync();
            return UserMapper.Map(user);
        }

        public async Task<PaginationResponse<GetSimplePersonDto>> GetLikedPeople(int id, PaginationParameters paginationParameters)
        {
            var user = await _context.Users.Include(u => u.Likes).ThenInclude(x => x.Credits).Include(u => u.Likes).ThenInclude(x => x.LikedBy).FirstOrDefaultAsync(p => p.Id == id);
            if (user is null) throw new NotFoundException($"User with Id '{id}' not found.");
            var count = user.Likes.Count;
            var mappedLikesList = user.Likes.Skip((paginationParameters.PageNumber - 1) * paginationParameters.PageSize).Take(paginationParameters.PageSize).Select(p => PersonMapper.MapSimple(p)).ToList();
            return new PaginationResponse<GetSimplePersonDto>(mappedLikesList, paginationParameters.PageNumber, paginationParameters.PageSize, count);
        }

        public async Task<PaginationResponse<GetFilmOverviewDto>> GetWatchedFilms(int id, PaginationParameters paginationParameters)
        {
            var user = await _context.Users.Include(f => f.Watched).ThenInclude(f => f.WatchedBy).FirstOrDefaultAsync(p => p.Id == id);
            if (user is null) throw new NotFoundException($"User with Id '{id}' not found.");
            var count = user.Watched.Count;
            var mappedWatchList = user.Watched.Skip((paginationParameters.PageNumber - 1) * paginationParameters.PageSize).Take(paginationParameters.PageSize).Select(f => FilmMapper.MapOverview(f)).ToList();
            return new PaginationResponse<GetFilmOverviewDto>(mappedWatchList, paginationParameters.PageNumber, paginationParameters.PageSize, count);
        }

        public async Task<GetUserDto> SetUserCanPublish(int id, UserCanPublishDto canPublish)
        {
            var user = await _context.Users.Include(f => f.Watched).ThenInclude(f => f.WatchedBy).FirstOrDefaultAsync(p => p.Id == id);
            if (user is null) throw new NotFoundException($"User with Id '{id}' not found.");
            user.CanPublish = canPublish.UserCanPublish;
            await _context.SaveChangesAsync();
            return UserMapper.Map(user);
        }

        public async Task<GetCanPublishDto> GetCanPublish(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user is null) throw new NotFoundException($"user with Id '{id}' not found.");

            return new GetCanPublishDto
            {
                CanPublish = user.CanPublish
            };
        }
    }
}