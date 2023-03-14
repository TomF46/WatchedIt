using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Film;

namespace WatchedIt.Api.Services.FilmService
{
    public class FilmService : IFilmService
    {
        private readonly IMapper _mapper;
        public readonly WatchedItContext _context;
        public FilmService(IMapper mapper, WatchedItContext context)
        {
            _context = context;
            _mapper = mapper;
            
        }
        public async Task<List<GetFilmDto>> GetAll()
        {
            var films = await _context.Films.ToListAsync();
            return films.Select(f => _mapper.Map<GetFilmDto>(f)).ToList();
        }

        public async Task<GetFilmDto> GetById(int id)
        {
            var film = await _context.Films.FirstOrDefaultAsync(f => f.Id == id);
            return _mapper.Map<GetFilmDto>(film);
        }

        public async Task<GetFilmDto> Add(AddFilmDto newFilm)
        {
            var film = _mapper.Map<Film>(newFilm);
            await _context.Films.AddAsync(film);
            await _context.SaveChangesAsync();
            return _mapper.Map<GetFilmDto>(film);
        }

        public async Task<GetFilmDto> Update(int id, UpdateFilmDto updatedFilm)
        {
            var film = await _context.Films.FirstOrDefaultAsync(f => f.Id == id);
            if(film is null) throw new Exception($"Film with Id '{id}' not found.");
            // film = _mapper.Map<Film>(updatedFilm);
            film.Name = updatedFilm.Name;
            film.ShortDescription = updatedFilm.ShortDescription;
            film.FullDescription = updatedFilm.FullDescription;
            film.Runtime = updatedFilm.Runtime;
            await _context.SaveChangesAsync();
            return _mapper.Map<GetFilmDto>(film);
        }

        public void Delete(int id)
        {
            var film = _context.Films.FirstOrDefault(f => f.Id == id);
            if(film is null) throw new Exception($"Film with Id '{id}' not found.");
            _context.Films.Remove(film);
            _context.SaveChangesAsync();
            return;
        }
    }
}