using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmTrivia;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.FilmTriviaService
{
    public class FilmTriviaService : IFilmTriviaService
    {

        public readonly WatchedItContext _context;

        public FilmTriviaService(WatchedItContext context)
        {
            _context = context;
        }

        public async Task<PaginationResponse<GetFilmTriviaDto>> GetAllForFilm(int id, PaginationParameters parameters)
        {
             var film = await _context.Films.FirstOrDefaultAsync(f => f.Id == id);
            if(film is null) throw new NotFoundException($"Film with Id '{id}' not found.");

            var query =  _context.FilmTrivias.Include(r => r.Film).Include(r=> r.User).Where(x => x.Film.Id == film.Id);
            var count = query.Count();
            query = query.OrderByDescending(x => x.Id);
            var trivia = await query.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize).ToListAsync();
            var mappedTrivia = trivia.Select(t => FilmTriviaMapper.Map(t)).ToList();
            return new PaginationResponse<GetFilmTriviaDto>(mappedTrivia, parameters.PageNumber, parameters.PageSize, count);
        }

        public async Task<GetFilmTriviaDto> GetById(int id)
        {
            var filmTrivia = await _context.FilmTrivias.Include(r => r.Film).Include(r=> r.User).FirstOrDefaultAsync(r => r.Id == id);
            if(filmTrivia is null) throw new NotFoundException($"FilmTrivia with Id '{id}' not found.");

            return FilmTriviaMapper.Map(filmTrivia);
        }

        public async Task<GetFilmTriviaDto> Add(int filmId, int userId, AddFilmTriviaDto newFilmTrivia)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if(user is null) throw new BadRequestException($"User with Id '{userId}' not found.");

            var film = await _context.Films.FirstOrDefaultAsync(f => f.Id == filmId);
            if(film is null) throw new BadRequestException($"Film with Id '{filmId}' not found.");

            var filmTrivia = new FilmTrivia{
                User = user,
                Film = film,
                Text = newFilmTrivia.Text
            };

            await _context.FilmTrivias.AddAsync(filmTrivia);
            await _context.SaveChangesAsync();
            
            return FilmTriviaMapper.Map(filmTrivia);
        }

        public async Task<GetFilmTriviaDto> Update(int id, int userId, UpdateFilmTriviaDto updatedFilmTrivia)
        {
            var filmTrivia = await _context.FilmTrivias.Include(r => r.Film).Include(r=> r.User).FirstOrDefaultAsync(r => r.Id == id);
            if(filmTrivia is null) throw new NotFoundException($"Film trivia with Id '{id}' not found.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if(user is null) throw new BadRequestException($"User with Id '{userId}' not found.");

            filmTrivia.Text = updatedFilmTrivia.Text;
            await _context.SaveChangesAsync();
            
            return FilmTriviaMapper.Map(filmTrivia);
        }

        public void Delete(int id, int userId)
        {
            var filmTrivia = _context.FilmTrivias.Include(r => r.Film).Include(r=> r.User).FirstOrDefault(r => r.Id == id);
            if(filmTrivia is null) throw new NotFoundException($"Film trivia with Id '{id}' not found.");

            var user = _context.Users.FirstOrDefault(u => u.Id == userId);
            if(user is null) throw new BadRequestException($"User with Id '{userId}' not found.");

            if(user is null || filmTrivia.User.Id != user.Id) throw new Exceptions.UnauthorizedAccessException("User not authorized");
        
            _context.FilmTrivias.Remove(filmTrivia);
            _context.SaveChanges();
            return;
        }
    }
}