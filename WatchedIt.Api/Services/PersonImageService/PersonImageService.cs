using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Files;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.PersonImageService
{
    public class PersonImageService : IPersonImageService
    {
        private readonly WatchedItContext _context;

        public PersonImageService(WatchedItContext context)
        {
            _context = context;
        }

        public async Task<PaginationResponse<GetImageDto>> GetImages(int personId, PaginationParameters parameters)
        {
            var person = await _context.People.Include(f => f.Images).FirstOrDefaultAsync(f => f.Id == personId);
            if (person is null) throw new NotFoundException($"Person with Id '{personId}' not found.");

            var images = person.Images.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize);
            var mappedImages = images.Select(i => ImageMapper.Map(i)).ToList();
            return new PaginationResponse<GetImageDto>(mappedImages, parameters.PageNumber, parameters.PageSize, person.Images.Count());
        }

        public async Task<GetImageDto> Add(int personId, AddImageDto newPersonImage)
        {
            var person = await _context.People.Include(f => f.Images).FirstOrDefaultAsync(f => f.Id == personId);
            if (person is null) throw new NotFoundException($"Person with Id '{personId}' not found.");

            var image = new PersonImage
            {
                Url = newPersonImage.Url,
                Person = person
            };

            person.Images.Add(image);
            await _context.SaveChangesAsync();

            return ImageMapper.Map(image);
        }

        public void Delete(int id)
        {
            var personImage = _context.PersonImages.FirstOrDefault(r => r.Id == id);
            if (personImage is null) throw new NotFoundException($"Person image with Id '{id}' not found.");

            _context.PersonImages.Remove(personImage);
            _context.SaveChanges();
            return;
        }
    }
}