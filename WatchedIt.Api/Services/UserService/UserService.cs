using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmModels;
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
            var user = await _context.Users.FindAsync(id);
            if(user is null) throw new NotFoundException($"user with Id '{id}' not found.");
            return UserMapper.Map(user);
        }

        public async Task<GetUserDto> AddWatchedFilm(int id, AddWatchedFilmDto watchedFilm)
        {
            var user = await _context.Users.FirstOrDefaultAsync(p => p.Id == id);
            if(user is null) throw new NotFoundException($"User with Id '{id}' not found.");

            var film = await _context.Films.FirstOrDefaultAsync(f => f.Id == watchedFilm.FilmId);
            if(film is null) throw new BadRequestException($"Film with Id '{watchedFilm.FilmId} does not exist");

            user.Watched.Add(film);
            await _context.SaveChangesAsync();
            return UserMapper.Map(user);

        }

        public async Task<GetUserDto> RemoveWatchedFilm(int id, RemoveWatchedFilmDto watchedFilm)
        {
            var user = await _context.Users.Include(p => p.Watched).FirstOrDefaultAsync(p => p.Id == id);
            if(user is null) throw new NotFoundException($"User with Id '{id}' not found.");

            var film = await _context.Films.FirstOrDefaultAsync(f => f.Id == watchedFilm.FilmId);
            if(film is null) throw new BadRequestException($"Film with Id '{watchedFilm.FilmId} does not exist");

            user.Watched.Remove(film);
            await _context.SaveChangesAsync();
            return UserMapper.Map(user);
        }

        public async Task<List<GetSimpleFilmDto>> GetWatchedFilms(int id)
        {
            var user = await _context.Users.Include(f => f.Watched).FirstOrDefaultAsync(p => p.Id == id);
            if(user is null) throw new NotFoundException($"User with Id '{id}' not found.");
            return  user.Watched.Select(f => FilmMapper.MapSimple(f)).ToList();
        }
    }
}