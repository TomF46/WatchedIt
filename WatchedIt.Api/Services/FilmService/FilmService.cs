using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Helpers;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.FilmService
{
    public class FilmService : IFilmService
    {
        private readonly WatchedItContext _context;
        public FilmService(WatchedItContext context)
        {
            _context = context;
        }
        public async Task<PaginationResponse<GetFilmOverviewDto>> GetAll(FilmSearchWithPaginationParameters parameters)
        {
            var query = _context.Films.Include(f => f.WatchedBy).AsQueryable();

            var filmSearchHelper = new FilmSearchHelper();
            query = filmSearchHelper.searchFilms(_context, query, parameters);

            var count = query.Count();
            var films = await query.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize).ToListAsync();
            var mappedFilms = films.Select(f => FilmMapper.MapOverview(f)).ToList();
            return new PaginationResponse<GetFilmOverviewDto>(mappedFilms, parameters.PageNumber, parameters.PageSize, count);
        }

        public async Task<GetFilmDto> GetById(int id)
        {
            var film = await _context.Films.Include(f => f.Categories).Include(f => f.Tags).Include(f => f.Credits).ThenInclude(c => c.Film).Include(f => f.Credits).ThenInclude(c => c.Person).Include(f => f.WatchedBy).FirstOrDefaultAsync(f => f.Id == id);
            if (film is null) throw new NotFoundException($"Film with Id '{id}' not found.");
            return FilmMapper.Map(film);
        }

        public async Task<GetFilmOverviewDto> Add(AddFilmDto newFilm)
        {
            var film = FilmMapper.MapForAdding(newFilm);
            var categories = _context.Categories.Where(x => newFilm.Categories.Contains(x.Id));
            await categories.ForEachAsync(x =>
            {
                film.Categories.Add(x);
            });
            var tags = _context.Tags.Where(x => newFilm.Languages.Contains(x.Id) || newFilm.AgeRatings.Contains(x.Id) || newFilm.OtherTags.Contains(x.Id));
            await tags.ForEachAsync(x =>
            {
                film.Tags.Add(x);
            });
            await _context.Films.AddAsync(film);
            await _context.SaveChangesAsync();
            return FilmMapper.MapOverview(film);
        }

        public async Task<GetFilmOverviewDto> Update(int id, UpdateFilmDto updatedFilm)
        {
            var film = await _context.Films.Include(f => f.Categories).Include(f => f.Tags).FirstOrDefaultAsync(f => f.Id == id);
            if (film is null) throw new NotFoundException($"Film with Id '{id}' not found.");
            film.Name = updatedFilm.Name;
            film.ShortDescription = updatedFilm.ShortDescription;
            film.FullDescription = updatedFilm.FullDescription;
            film.Runtime = updatedFilm.Runtime;
            film.ReleaseDate = updatedFilm.ReleaseDate;
            film.PosterUrl = updatedFilm.PosterUrl;
            film.TrailerUrl = updatedFilm.TrailerUrl;
            film.Categories.Clear();
            var categories = await _context.Categories.Where(x => updatedFilm.Categories.Contains(x.Id)).ToListAsync();
            categories.ForEach(x =>
            {
                film.Categories.Add(x);
            });
            film.Tags.Clear();
            var tags = await _context.Tags.Where(x => updatedFilm.Languages.Contains(x.Id) || updatedFilm.AgeRatings.Contains(x.Id) || updatedFilm.OtherTags.Contains(x.Id)).ToListAsync();
            tags.ForEach(x =>
            {
                film.Tags.Add(x);
            });
            await _context.SaveChangesAsync();
            return FilmMapper.MapOverview(film);
        }

        public void Delete(int id)
        {
            var film = _context.Films.FirstOrDefault(f => f.Id == id);
            if (film is null) throw new NotFoundException($"Film with Id '{id}' not found.");
            _context.Films.Remove(film);
            _context.Entry(film).State = EntityState.Deleted;
            _context.SaveChanges();
            return;
        }

        public async Task<PaginationResponse<GetFilmOverviewDto>> GetSimilarFilmsById(int id, PaginationParameters parameters)
        {
            var film = _context.Films.Include(f => f.Categories).FirstOrDefault(f => f.Id == id);
            if (film is null) throw new NotFoundException($"Film with Id '{id}' not found.");

            var query = _context.Films.Include(f => f.WatchedBy).Where(x => x.Id != film.Id).Where(x => x.Categories.Any(x => film.Categories.Contains(x))).AsQueryable();

            var count = query.Count();
            var films = await query.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize).ToListAsync();
            var mappedFilms = films.Select(f => FilmMapper.MapOverview(f)).ToList();
            return new PaginationResponse<GetFilmOverviewDto>(mappedFilms, parameters.PageNumber, parameters.PageSize, count);
        }
    }
}