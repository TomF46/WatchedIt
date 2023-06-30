using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Models.UserModels;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.UserService
{
    public class UserService : IUserService
    {
        public readonly WatchedItContext _context;
        public UserService(WatchedItContext context)
        {
            _context = context;
        }

        public async Task<GetUserDto> GetById(int id)
        {
            var user = await _context.Users.Include(u => u.Watched).FirstOrDefaultAsync(u => u.Id == id);
            if(user is null) throw new NotFoundException($"user with Id '{id}' not found.");
            return UserMapper.Map(user);
        }

        public async Task<GetIsAdminDto> GetIsUserAdmin(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if(user is null) throw new NotFoundException($"user with Id '{id}' not found.");

            return new GetIsAdminDto{
                isAdmin = user.Role == Role.Administrator
            };
        }

        public async Task<GetUserDto> Update(int id, UpdateUserDto updatedUser)
        {
            var user = await _context.Users.Include(f => f.Watched).FirstOrDefaultAsync(p => p.Id == id);
            if(user is null) throw new NotFoundException($"User with Id '{id}' not found.");
            user.ImageUrl = updatedUser.ImageUrl;
            user.Biography = updatedUser.Biography;
            await _context.SaveChangesAsync();
            return UserMapper.Map(user);
        }

        public async Task<PaginationResponse<GetSimplePersonDto>> GetLikedPeople(int id, PaginationParameters paginationParameters)
        {
            var user = await _context.Users.Include(u => u.Likes).ThenInclude(x => x.Credits).Include(u => u.Likes).ThenInclude(x => x.LikedBy).FirstOrDefaultAsync(p => p.Id == id);
            if(user is null) throw new NotFoundException($"User with Id '{id}' not found.");
            var count = user.Likes.Count;
            var mappedLikesList = user.Likes.Skip((paginationParameters.PageNumber - 1) * paginationParameters.PageSize).Take(paginationParameters.PageSize).Select(p => PersonMapper.MapSimple(p)).ToList();
            return new PaginationResponse<GetSimplePersonDto>(mappedLikesList, paginationParameters.PageNumber, paginationParameters.PageSize, count);
        }

        public async Task<PaginationResponse<GetFilmOverviewDto>> GetWatchedFilms(int id, PaginationParameters paginationParameters)
        {
            var user = await _context.Users.Include(f => f.Watched).ThenInclude(f => f.WatchedBy).FirstOrDefaultAsync(p => p.Id == id);
            if(user is null) throw new NotFoundException($"User with Id '{id}' not found.");
            var count = user.Watched.Count;
            var mappedWatchList = user.Watched.Skip((paginationParameters.PageNumber - 1) * paginationParameters.PageSize).Take(paginationParameters.PageSize).Select(f => FilmMapper.MapOverview(f)).ToList();
            return new PaginationResponse<GetFilmOverviewDto>(mappedWatchList, paginationParameters.PageNumber, paginationParameters.PageSize, count);
        }
    }
}