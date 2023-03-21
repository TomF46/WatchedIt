using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.FilmService
{
    public class FilmService : IFilmService
    {
        public readonly WatchedItContext _context;
        public FilmService(WatchedItContext context)
        {
            _context = context;
        }
        public async Task<List<GetFilmOverviewDto>> GetAll(FilmParameters filmParameters)
        {
            var films = await _context.Films.Skip((filmParameters.PageNumber - 1) * filmParameters.PageSize).Take(filmParameters.PageSize).ToListAsync();
            return films.Select(f => FilmMapper.MapOverview(f)).ToList();
        }

        public async Task<GetFilmDto> GetById(int id)
        {
            var film = await _context.Films.Include(f => f.Credits).ThenInclude(c => c.Film).Include(f => f.Credits).ThenInclude(c => c.Person).FirstOrDefaultAsync(f => f.Id == id);
            if(film is null) throw new NotFoundException($"Film with Id '{id}' not found.");
            return FilmMapper.Map(film);
        }

        public async Task<GetFilmOverviewDto> Add(AddFilmDto newFilm)
        {
            var film = FilmMapper.MapForAdding(newFilm);
            await _context.Films.AddAsync(film);
            await _context.SaveChangesAsync();
            return FilmMapper.MapOverview(film);
        }

        public async Task<GetFilmOverviewDto> Update(int id, UpdateFilmDto updatedFilm)
        {
            var film = await _context.Films.FirstOrDefaultAsync(f => f.Id == id);
            if(film is null) throw new NotFoundException($"Film with Id '{id}' not found.");
            film.Name = updatedFilm.Name;
            film.ShortDescription = updatedFilm.ShortDescription;
            film.FullDescription = updatedFilm.FullDescription;
            film.Runtime = updatedFilm.Runtime;
            await _context.SaveChangesAsync();
            return FilmMapper.MapOverview(film);
        }

        public void Delete(int id)
        {
            var film = _context.Films.FirstOrDefault(f => f.Id == id);
            if(film is null) throw new NotFoundException($"Film with Id '{id}' not found.");
            _context.Films.Remove(film);
            _context.SaveChangesAsync();
            return;
        }
    }
}