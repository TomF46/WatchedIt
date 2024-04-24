using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Files;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.FilmImageService
{
    public class FilmImageService : IFilmImageService
    {
        private readonly WatchedItContext _context;

        public FilmImageService(WatchedItContext context)
        {
            _context = context;
        }

        public async Task<PaginationResponse<GetImageDto>> GetImages(int filmId, PaginationParameters parameters)
        {
            var film = await _context.Films.Include(f => f.Images).FirstOrDefaultAsync(f => f.Id == filmId);
            if (film is null) throw new NotFoundException($"Film with Id '{filmId}' not found.");

            var images = film.Images.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize);
            var mappedImages = images.Select(i => ImageMapper.Map(i)).ToList();
            return new PaginationResponse<GetImageDto>(mappedImages, parameters.PageNumber, parameters.PageSize, film.Images.Count());
        }

        public async Task<GetImageDto> Add(int filmId, AddImageDto newFilmImage)
        {
            var film = await _context.Films.Include(f => f.Images).FirstOrDefaultAsync(f => f.Id == filmId);
            if (film is null) throw new NotFoundException($"Film with Id '{filmId}' not found.");

            var image = new FilmImage
            {
                Url = newFilmImage.Url,
                Film = film
            };

            film.Images.Add(image);
            await _context.SaveChangesAsync();

            return ImageMapper.Map(image);
        }

        public void Delete(int id)
        {
            var filmImage = _context.FilmImages.FirstOrDefault(r => r.Id == id);
            if (filmImage is null) throw new NotFoundException($"Film image with Id '{id}' not found.");

            _context.FilmImages.Remove(filmImage);
            _context.SaveChanges();
            return;
        }
    }
}