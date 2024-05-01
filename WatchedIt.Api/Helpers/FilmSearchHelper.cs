using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.FilmModels;

namespace WatchedIt.Api.Helpers
{
    public class FilmSearchHelper
    {
        public IQueryable<Film> searchFilms(WatchedItContext _context, IQueryable<Film> films, FilmSearchWithPaginationParameters parameters)
        {
            if (!string.IsNullOrWhiteSpace(parameters.SearchTerm)) films = films.Where(f => f.Name.ToLower().Contains(parameters.SearchTerm.Trim().ToLower()));

            if (parameters.Category is not null)
            {
                var category = _context.Categories.FirstOrDefault(x => x.Id == parameters.Category);
                if (category is null) throw new NotFoundException("Category does not exist");
                films = films.Where(x => x.Categories.Contains(category));
            }

            if (parameters.Tag is not null)
            {
                var tag = _context.Tags.FirstOrDefault(x => x.Id == parameters.Tag);
                if (tag is null) throw new NotFoundException("Tag does not exist");
                films = films.Where(x => x.Tags.Contains(tag));
            }

            if (parameters.ReleasedOnDate.HasValue) films = films.Where(f => f.ReleaseDate.Date == parameters.ReleasedOnDate.Value.Date);
            if (parameters.ReleasedBeforeDate.HasValue) films = films.Where(f => f.ReleaseDate.Date <= parameters.ReleasedBeforeDate.Value.Date);
            if (parameters.ReleasedAfterDate.HasValue) films = films.Where(f => f.ReleaseDate.Date > parameters.ReleasedAfterDate.Value.Date);


            if (parameters.MinRating.HasValue) films = films.Where(f => f.AverageRating >= parameters.MinRating.Value);
            if (parameters.MaxRating.HasValue) films = films.Where(f => f.AverageRating <= parameters.MaxRating.Value);


            switch (parameters.Sort)
            {
                case "name_desc":
                    films = films.OrderByDescending(f => f.Name);
                    break;
                case "name_asc":
                    films = films.OrderBy(f => f.Name);
                    break;
                case "release_desc":
                    films = films.OrderByDescending(f => f.ReleaseDate).ThenBy(x => x.Name);
                    break;
                case "release_asc":
                    films = films.OrderBy(f => f.ReleaseDate).ThenBy(x => x.Name);
                    break;
                case "rating_desc":
                    films = films.OrderByDescending(f => f.AverageRating).ThenBy(x => x.Name);
                    break;
                case "rating_asc":
                    films = films.OrderBy(f => f.AverageRating).ThenBy(x => x.Name);
                    break;
                case "watched_desc":
                    films = films.OrderByDescending(f => f.WatchedBy.Count()).ThenBy(x => x.Name);
                    break;
                case "watched_asc":
                    films = films.OrderBy(f => f.WatchedBy.Count()).ThenBy(x => x.Name);
                    break;
                default:
                    films = films.OrderByDescending(f => f.AverageRating).ThenBy(x => x.Name);
                    break;
            };

            return films;
        }
    }
}