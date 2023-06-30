using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Services.WatchedFilmsService;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
    [TestFixture]
    public class WatchedFilmsServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly IWatchedFilmsService _watchedFilmsService;

        public WatchedFilmsServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _watchedFilmsService = new WatchedFilmsService(_context);
        }

        [SetUp]
        public void Setup()
        {
            _context.Users.RemoveRange(_context.Users);
            _context.Films.RemoveRange(_context.Films);
            _context.SaveChanges();
        }

        [TearDown]
        public void dispose()
        {
            _context.Users.RemoveRange(_context.Users);
            _context.Films.RemoveRange(_context.Films);
            _context.SaveChanges();
        }

        [Test]
        public async Task CanAddWatchedFilmForUser(){
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            _context.Users.Add(user);
            _context.Films.Add(film);
            await _context.SaveChangesAsync();

            var filmToAdd = new AddWatchedFilmDto{
                FilmId = film.Id
            };

            await _watchedFilmsService.AddWatchedFilm(user.Id, filmToAdd);

            Assert.That(user.Watched.Count(), Is.EqualTo(1));
        }

        [Test]
        public async Task CanGetIfAUserHasWatchedAFilmById(){
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            _context.Users.Add(user);
            _context.Films.Add(film);
            user.Watched.Add(film);
            await _context.SaveChangesAsync();

            var hasWatched = await _watchedFilmsService.CurrentUserHasWatchedFilmWithId(film.Id, user.Id);
            Assert.IsTrue(hasWatched);
        }

        [Test]
        public async Task CanGetIfAUserHasNotWatchedAFilmById(){
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            var film2 = RandomDataGenerator.GenerateFilm();
            _context.Users.Add(user);
            _context.Films.Add(film);
            _context.Films.Add(film2);
            user.Watched.Add(film);
            await _context.SaveChangesAsync();

            var hasWatched = await _watchedFilmsService.CurrentUserHasWatchedFilmWithId(film2.Id, user.Id);
            Assert.IsFalse(hasWatched);
        }

        [Test]
        public async Task CanRemoveWatchedFilmForUser(){
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            _context.Users.Add(user);
            _context.Films.Add(film);
            user.Watched.Add(film);
            await _context.SaveChangesAsync();

            Assert.That(user.Watched.Count, Is.EqualTo(1));

            await _watchedFilmsService.RemoveWatchedFilm(user.Id, film.Id);

            Assert.That(user.Watched.Count, Is.EqualTo(0));
        }
        
    }
}