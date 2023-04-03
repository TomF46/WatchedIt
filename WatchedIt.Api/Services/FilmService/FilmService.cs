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
        public async Task<List<GetFilmOverviewDto>> GetAll(SearchWithPaginationParameters parameters)
        {
            var query =  _context.Films.AsQueryable();

            if(!string.IsNullOrWhiteSpace(parameters.SearchTerm)) query = query.Where(f => f.Name.ToLower().Contains(parameters.SearchTerm.Trim().ToLower()));
            if(parameters.Category is not null){
                var category = _context.Categories.FirstOrDefault(x => x.Id == parameters.Category);
                if(category is null) throw new NotFoundException("Category does not exist");
                query = query.Where(x => x.Categories.Contains(category));
            }
            var films = await query.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize).ToListAsync();
            return films.Select(f => FilmMapper.MapOverview(f)).ToList();
        }

        public async Task<GetFilmDto> GetById(int id)
        {
            var film = await _context.Films.Include(f => f.Categories).Include(f => f.Credits).ThenInclude(c => c.Film).Include(f => f.Credits).ThenInclude(c => c.Person).FirstOrDefaultAsync(f => f.Id == id);
            if(film is null) throw new NotFoundException($"Film with Id '{id}' not found.");
            return FilmMapper.Map(film);
        }

        public async Task<GetFilmOverviewDto> Add(AddFilmDto newFilm)
        {
            var film = FilmMapper.MapForAdding(newFilm);
            var categories = _context.Categories.Where(x => newFilm.Categories.Contains(x.Id));
            await categories.ForEachAsync(x => {
                film.Categories.Add(x);
            });
            await _context.Films.AddAsync(film);
            await _context.SaveChangesAsync();
            return FilmMapper.MapOverview(film);
        }

        public async Task<GetFilmOverviewDto> Update(int id, UpdateFilmDto updatedFilm)
        {
            var film = await _context.Films.Include(f => f.Categories).FirstOrDefaultAsync(f => f.Id == id);
            if(film is null) throw new NotFoundException($"Film with Id '{id}' not found.");
            film.Name = updatedFilm.Name;
            film.ShortDescription = updatedFilm.ShortDescription;
            film.FullDescription = updatedFilm.FullDescription;
            film.Runtime = updatedFilm.Runtime;
            film.ReleaseDate = updatedFilm.ReleaseDate;
            film.PosterUrl = updatedFilm.PosterUrl;
            film.Categories.Clear();
            var categories = await _context.Categories.Where(x => updatedFilm.Categories.Contains(x.Id)).ToListAsync();
            categories.ForEach(x => {
                film.Categories.Add(x);
            });
            await _context.SaveChangesAsync();
            return FilmMapper.MapOverview(film);
        }

        public void Delete(int id)
        {
            var film = _context.Films.FirstOrDefault(f => f.Id == id);
            if(film is null) throw new NotFoundException($"Film with Id '{id}' not found.");
            _context.Films.Remove(film);
            _context.Entry(film).State = EntityState.Deleted;
            _context.SaveChanges();
            return;
        }
    }
}