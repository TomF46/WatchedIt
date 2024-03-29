using Data;

using WatchedIt.Api.Exceptions;
using WatchedIt.Api.Models;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Services.FilmService;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
    [TestFixture]
    public class FilmServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly IFilmService _filmService;

        public FilmServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _filmService = new FilmService(_context);
        }
        [SetUp]
        public void Setup()
        {
            _context.Films.RemoveRange(_context.Films);
            _context.SaveChanges();
        }

        [TearDown]
        public void Dispose()
        {
            _context.Films.RemoveRange(_context.Films);
            _context.SaveChanges();
        }

        [Test]
        public void CanAddFilm()
        {
            Assert.DoesNotThrow(() =>
            {
                var film = new AddFilmDto
                {
                    Name = "Jaws",
                    ShortDescription = "Its about a shark",
                    FullDescription = "A full description for a film about a shark.",
                    Runtime = 100,
                    ReleaseDate = new DateTime().Date
                };

                _filmService.Add(film);
            });
        }

        [Test]
        public async Task CanGetExistingFilm()
        {
            var film = RandomDataGenerator.GenerateFilm();
            await _context.Films.AddAsync(film);
            await _context.SaveChangesAsync();

            var filmFromDb = await _filmService.GetById(film.Id);

            Assert.That(filmFromDb.Id, Is.EqualTo(film.Id));
        }

        [Test]
        public async Task CanGetMultipleFilms()
        {
            var film = RandomDataGenerator.GenerateFilm();
            var film2 = RandomDataGenerator.GenerateFilm();
            await _context.Films.AddAsync(film);
            await _context.Films.AddAsync(film2);
            await _context.SaveChangesAsync();

            var pagination = new FilmSearchWithPaginationParameters
            {
                PageNumber = 1,
                PageSize = 20
            };

            var allFilms = await _filmService.GetAll(pagination);

            Assert.That(allFilms.Data, Has.Count.EqualTo(2));
        }

        [Test]
        public async Task CanDeleteFilm()
        {
            var film = RandomDataGenerator.GenerateFilm();
            await _context.Films.AddAsync(film);
            await _context.SaveChangesAsync();

            _filmService.Delete(film.Id);

            Assert.ThrowsAsync<NotFoundException>(async () =>
            {
                await _filmService.GetById(film.Id);
            });
        }

        [Test]
        public async Task CanUpdateFilm()
        {
            var film = RandomDataGenerator.GenerateFilm();
            film.Name = "Jaws";
            await _context.Films.AddAsync(film);
            await _context.SaveChangesAsync();

            var newName = "Jaws 3";

            var updatedFilm = new UpdateFilmDto
            {
                Name = newName,
                ShortDescription = "Its still a film about a shark",
                FullDescription = "A full description for a film about a shark.",
                Runtime = 100,
                ReleaseDate = new DateTime().Date
            };

            await _filmService.Update(film.Id, updatedFilm);

            var filmFromDB = await _filmService.GetById(film.Id);

            Assert.Multiple(() =>
            {
                Assert.That(filmFromDB.Id, Is.EqualTo(film.Id));
                Assert.That(filmFromDB.Name, Is.EqualTo(newName));
            });
        }

        [Test]
        public async Task CanSearchFilmsUsingMaxRating()
        {
            var film = RandomDataGenerator.GenerateFilm();
            film.AverageRating = 9;
            var film2 = RandomDataGenerator.GenerateFilm();
            film2.AverageRating = 4.5;
            var film3 = RandomDataGenerator.GenerateFilm();
            film3.AverageRating = 6.5;
            await _context.Films.AddAsync(film);
            await _context.Films.AddAsync(film2);
            await _context.Films.AddAsync(film3);
            await _context.SaveChangesAsync();

            var pagination = new FilmSearchWithPaginationParameters
            {
                MaxRating = 6,
                PageNumber = 1,
                PageSize = 20
            };

            var allFilms = await _filmService.GetAll(pagination);

            Assert.That(allFilms.Data, Has.Count.EqualTo(1));
        }


        [Test]
        public async Task CanSearchFilmsUsingMinRating()
        {
            var film = RandomDataGenerator.GenerateFilm();
            film.AverageRating = 9;
            var film2 = RandomDataGenerator.GenerateFilm();
            film2.AverageRating = 4.5;
            var film3 = RandomDataGenerator.GenerateFilm();
            film3.AverageRating = 6.5;
            await _context.Films.AddAsync(film);
            await _context.Films.AddAsync(film2);
            await _context.Films.AddAsync(film3);
            await _context.SaveChangesAsync();

            var pagination = new FilmSearchWithPaginationParameters
            {
                MinRating = 6,
                PageNumber = 1,
                PageSize = 20
            };

            var allFilms = await _filmService.GetAll(pagination);

            Assert.That(allFilms.Data, Has.Count.EqualTo(2));
        }
    }
}