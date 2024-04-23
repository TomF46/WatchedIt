using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Data;

using WatchedIt.Api.Models;
using WatchedIt.Api.Models.Files;
using WatchedIt.Api.Services.FilmImageService;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
    [TestFixture]
    public class FilmImageServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly IFilmImageService _filmImageService;
        public FilmImageServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _filmImageService = new FilmImageService(_context);
        }

        [SetUp]
        public void Setup()
        {
            _context.Films.RemoveRange(_context.Films);
            _context.Users.RemoveRange(_context.Users);
            _context.FilmImages.RemoveRange(_context.FilmImages);
            _context.SaveChanges();
        }

        [TearDown]
        public void Dispose()
        {
            _context.Films.RemoveRange(_context.Films);
            _context.Users.RemoveRange(_context.Users);
            _context.FilmImages.RemoveRange(_context.FilmImages);
            _context.SaveChanges();
        }

        [Test]
        public async Task CanAddFilmImage()
        {
            var film = RandomDataGenerator.GenerateFilm();
            await _context.Films.AddAsync(film);
            await _context.SaveChangesAsync();

            Assert.DoesNotThrowAsync(async () =>
            {
                var filmImage = new AddFilmImageDto
                {
                    Url = "someUrl."
                };

                await _filmImageService.Add(film.Id, filmImage);
            });
        }

        [Test]
        public async Task CanGetAllImagesForFilm()
        {
            var film = RandomDataGenerator.GenerateFilm();
            var image1 = RandomDataGenerator.GenerateFilmImage();
            var image2 = RandomDataGenerator.GenerateFilmImage();
            var image3 = RandomDataGenerator.GenerateFilmImage();
            film.Images.Add(image1);
            film.Images.Add(image2);
            film.Images.Add(image3);
            await _context.Films.AddAsync(film);
            await _context.SaveChangesAsync();

            var pagination = new PaginationParameters
            {
                PageNumber = 1,
                PageSize = 20
            };

            var filmImages = await _filmImageService.GetImages(film.Id, pagination);
            Assert.That(filmImages.Of, Is.EqualTo(3));
        }

        [Test]
        public async Task CanAddFilmImageAndGet()
        {
            var film = RandomDataGenerator.GenerateFilm();
            await _context.Films.AddAsync(film);
            await _context.SaveChangesAsync();

            var filmImage = new AddFilmImageDto
            {
                Url = "someUrl."
            };

            await _filmImageService.Add(film.Id, filmImage);

            var pagination = new PaginationParameters
            {
                PageNumber = 1,
                PageSize = 20
            };

            var filmImages = await _filmImageService.GetImages(film.Id, pagination);
            Assert.That(filmImages.Of, Is.EqualTo(1));
        }

        [Test]
        public async Task CanDeleteFilmImage()
        {
            var film = RandomDataGenerator.GenerateFilm();
            var image1 = RandomDataGenerator.GenerateFilmImage();
            film.Images.Add(image1);
            await _context.Films.AddAsync(film);
            await _context.SaveChangesAsync();

            _filmImageService.Delete(image1.Id);

            var pagination = new PaginationParameters
            {
                PageNumber = 1,
                PageSize = 20
            };

            var filmImages = await _filmImageService.GetImages(film.Id, pagination);
            Assert.That(filmImages.Of, Is.EqualTo(0));

        }

        [Test]
        public async Task CanGetAllImagesForFilmWithNoImages()
        {
            var film = RandomDataGenerator.GenerateFilm();
            await _context.Films.AddAsync(film);
            await _context.SaveChangesAsync();

            var pagination = new PaginationParameters
            {
                PageNumber = 1,
                PageSize = 20
            };

            var filmImages = await _filmImageService.GetImages(film.Id, pagination);
            Assert.That(filmImages.Of, Is.EqualTo(0));
        }

    }
}