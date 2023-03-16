using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using NUnit.Framework;
using WatchedIt.Api.Exceptions;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Services.FilmService;

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
        public void dispose()
        {
            _context.Films.RemoveRange(_context.Films);
            _context.SaveChanges();
        }

        [Test]
        public void CanAddFilm()
        {
            Assert.DoesNotThrow(() => {
                var film = new AddFilmDto {
                    Name = "Jaws",
                    ShortDescription = "Its about a shark",
                    FullDescription = "A full description for a film about a shark.",
                    Runtime = 100
                };

                _filmService.Add(film);
            });
        }

        [Test]
        public async Task CanGetExistingFilm()
        {
            var film = new AddFilmDto {
                Name = "Jaws 2 ",
                ShortDescription = "Its about a shark 2",
                FullDescription = "A full description for a film about a shark 2.",
                Runtime = 100
            };

            var existingFilm =await _filmService.Add(film);

            var filmFromDb = await _filmService.GetById(existingFilm.Id);

            Assert.That(filmFromDb.Id, Is.EqualTo(existingFilm.Id));
        }

        [Test]
        public async Task CanGetMultipleFilms()
        {
            await _filmService.Add(new AddFilmDto {
                Name = "Jaws",
                ShortDescription = "Its about a shark",
                FullDescription = "A full description for a film about a shark.",
                Runtime = 100
            });

            await _filmService.Add(new AddFilmDto {
                Name = "Jaws 2 ",
                ShortDescription = "Its about a shark 2",
                FullDescription = "A full description for a film about a shark 2.",
                Runtime = 100
            });

            var allFilms = await _filmService.GetAll();

            Assert.That(allFilms.Count(), Is.EqualTo(2));
        }

        [Test]
        public void CanDeleteFilm()
        {
            var film = new Film
            {
                Name = "Jaws",
                ShortDescription = "Its about a shark",
                FullDescription = "A full description for a film about a shark.",
                Runtime = 100
            };

            _context.Films.Add(film);
            _context.SaveChanges();

            _filmService.Delete(film.Id);

            Assert.ThrowsAsync<NotFoundException>(async () =>
            {
                await _filmService.GetById(film.Id);
            });
        }

        [Test]
        public async Task CanUpdateFilm()
        {
            var film = new Film
            {
                Name = "Jaws",
                ShortDescription = "Its about a shark",
                FullDescription = "A full description for a film about a shark.",
                Runtime = 100
            };

            _context.Films.Add(film);
            _context.SaveChanges();

            var newName = "Jaws 3";

            var updatedFilm = new UpdateFilmDto{
                Name = newName,
                ShortDescription = "Its still a film about a shark",
                FullDescription ="A full description for a film about a shark.",
                Runtime = 100
            };

            await _filmService.Update(film.Id, updatedFilm);
            
            var filmFromDB = await _filmService.GetById(film.Id);

            Assert.That(filmFromDB.Id, Is.EqualTo(film.Id));
            Assert.That(filmFromDB.Name, Is.EqualTo(newName));
        }
    }
}