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
        private readonly WatchedItContext _context;
        public FilmService(WatchedItContext context)
        {
            _context = context;
        }
        public async Task<PaginationResponse<GetFilmOverviewDto>> GetAll(FilmSearchWithPaginationParameters parameters)
        {
            var query = _context.Films.Include(f => f.WatchedBy).AsQueryable();

            if (!string.IsNullOrWhiteSpace(parameters.SearchTerm)) query = query.Where(f => f.Name.ToLower().Contains(parameters.SearchTerm.Trim().ToLower()));

            if (parameters.Category is not null)
            {
                var category = _context.Categories.FirstOrDefault(x => x.Id == parameters.Category);
                if (category is null) throw new NotFoundException("Category does not exist");
                query = query.Where(x => x.Categories.Contains(category));
            }
            
            if (parameters.ReleasedOnDate.HasValue) query = query.Where(f => f.ReleaseDate.Date == parameters.ReleasedOnDate.Value.Date);
            if (parameters.ReleasedBeforeDate.HasValue) query = query.Where(f => f.ReleaseDate.Date <= parameters.ReleasedBeforeDate.Value.Date);
            if (parameters.ReleasedAfterDate.HasValue) query = query.Where(f => f.ReleaseDate.Date > parameters.ReleasedAfterDate.Value.Date);


            if (parameters.MinRating.HasValue) query = query.Where(f => f.AverageRating >= parameters.MinRating.Value);
            if (parameters.MaxRating.HasValue) query = query.Where(f => f.AverageRating <= parameters.MaxRating.Value);


            switch (parameters.Sort)
            {
                case "name_desc":
                    query = query.OrderByDescending(f => f.Name);
                    break;
                case "name_asc":
                    query = query.OrderBy(f => f.Name);
                    break;
                case "release_desc":
                    query = query.OrderByDescending(f => f.ReleaseDate).ThenBy(x => x.Name);
                    break;
                case "release_asc":
                    query = query.OrderBy(f => f.ReleaseDate).ThenBy(x => x.Name);
                    break;
                case "rating_desc":
                    query = query.OrderByDescending(f => f.AverageRating).ThenBy(x => x.Name);
                    break;
                case "rating_asc":
                    query = query.OrderBy(f => f.AverageRating).ThenBy(x => x.Name);
                    break;
                case "watched_desc":
                    query = query.OrderByDescending(f => f.WatchedBy.Count()).ThenBy(x => x.Name);
                    break;
                case "watched_asc":
                    query = query.OrderBy(f => f.WatchedBy.Count()).ThenBy(x => x.Name);
                    break;
                default:
                    query = query.OrderByDescending(f => f.AverageRating).ThenBy(x => x.Name);
                    break;
            };

            var count = query.Count();
            var films = await query.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize).ToListAsync();
            var mappedFilms = films.Select(f => FilmMapper.MapOverview(f)).ToList();
            return new PaginationResponse<GetFilmOverviewDto>(mappedFilms, parameters.PageNumber, parameters.PageSize, count);
        }

        public async Task<GetFilmDto> GetById(int id)
        {
            var film = await _context.Films.Include(f => f.Categories).Include(f => f.Credits).ThenInclude(c => c.Film).Include(f => f.Credits).ThenInclude(c => c.Person).Include(f => f.WatchedBy).FirstOrDefaultAsync(f => f.Id == id);
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
            await _context.Films.AddAsync(film);
            await _context.SaveChangesAsync();
            return FilmMapper.MapOverview(film);
        }

        public async Task<GetFilmOverviewDto> Update(int id, UpdateFilmDto updatedFilm)
        {
            var film = await _context.Films.Include(f => f.Categories).FirstOrDefaultAsync(f => f.Id == id);
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