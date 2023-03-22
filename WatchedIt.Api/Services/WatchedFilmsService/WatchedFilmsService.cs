using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.UserModels;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.WatchedFilmsService
{
    public class WatchedFilmsService : IWatchedFilmsService
    {
        public readonly WatchedItContext _context;
        public WatchedFilmsService(WatchedItContext context)
        {
            _context = context;
        }

        public async Task<GetHasWatchedFilmDto> CurrentUserHasWatchedFilmWithId(int id, int userId)
        {
            var currentUser = await _context.Users.Include(f => f.Watched).FirstOrDefaultAsync(u => u.Id == userId);
            if(currentUser is null) throw new BadRequestException($"User must be logged in to perform this action");

            var hasWatched = currentUser.Watched.FirstOrDefault(x => x.Id == id);
            return new GetHasWatchedFilmDto{
                Watched = hasWatched != null
            };

        }

        public async Task<GetHasWatchedFilmDto> AddWatchedFilm(int id, AddWatchedFilmDto watchedFilm)
        {
            var user = await _context.Users.FirstOrDefaultAsync(p => p.Id == id);
            if(user is null) throw new NotFoundException($"User with Id '{id}' not found.");

            var film = await _context.Films.FirstOrDefaultAsync(f => f.Id == watchedFilm.FilmId);
            if(film is null) throw new BadRequestException($"Film with Id '{watchedFilm.FilmId} does not exist");

            user.Watched.Add(film);
            await _context.SaveChangesAsync();
            return new GetHasWatchedFilmDto{
                Watched = true
            };

        }

        public async Task<GetHasWatchedFilmDto> RemoveWatchedFilm(int id, RemoveWatchedFilmDto watchedFilm)
        {
            var user = await _context.Users.Include(p => p.Watched).FirstOrDefaultAsync(p => p.Id == id);
            if(user is null) throw new NotFoundException($"User with Id '{id}' not found.");

            var film = await _context.Films.FirstOrDefaultAsync(f => f.Id == watchedFilm.FilmId);
            if(film is null) throw new BadRequestException($"Film with Id '{watchedFilm.FilmId} does not exist");

            user.Watched.Remove(film);
            await _context.SaveChangesAsync();
            return new GetHasWatchedFilmDto{
                Watched = false
            };
        }
    }
}