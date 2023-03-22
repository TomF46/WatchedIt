using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Services.UserService;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
    public class UserServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly IUserService _userService;

        public UserServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _userService = new UserService(_context);
        }
        [SetUp]
        public void Setup()
        {
            _context.Users.RemoveRange(_context.Users);
            _context.SaveChanges();
        }

        [TearDown]
        public void dispose()
        {
            _context.Users.RemoveRange(_context.Users);
            _context.SaveChanges();
        }

        // [Test]
        // public async  Task CanAddWatchedFilm(){
        //     var user = RandomDataGenerator.GenerateUser();
        //     var film = RandomDataGenerator.GenerateFilm();

        //     await _context.Films.AddAsync(film);
        //     await _context.Users.AddAsync(user);
        //     await _context.SaveChangesAsync();

        //     await _userService.AddWatchedFilm(user.Id, new AddWatchedFilmDto {
        //         FilmId = film.Id
        //     });

        //     var watchedFilms = await _userService.GetWatchedFilms(user.Id);
        //     Assert.That(watchedFilms.Count(), Is.EqualTo(1));

        // }

        // [Test]
        // public async  Task CanRemoveWatchedFilm(){
        //     var user = RandomDataGenerator.GenerateUser();
        //     var film = RandomDataGenerator.GenerateFilm();

        //     await _context.Films.AddAsync(film);
        //     await _context.Users.AddAsync(user);
        //     await _context.SaveChangesAsync();

        //     await _userService.AddWatchedFilm(user.Id, new AddWatchedFilmDto {
        //         FilmId = film.Id
        //     });

        //     var watchedFilms = await _userService.GetWatchedFilms(user.Id);
        //     Assert.That(watchedFilms.Count(), Is.EqualTo(1));

        //     await _userService.RemoveWatchedFilm(user.Id, new RemoveWatchedFilmDto {
        //         FilmId = film.Id
        //     });

        //     watchedFilms = await _userService.GetWatchedFilms(user.Id);
        //     Assert.That(watchedFilms.Count(), Is.EqualTo(0));
        // }

        // [Test]
        // public async  Task CanCalculateWatchedFilmCount(){
        //     var user = RandomDataGenerator.GenerateUser();
        //     var film = RandomDataGenerator.GenerateFilm();

        //     await _context.Films.AddAsync(film);
        //     await _context.Users.AddAsync(user);
        //     await _context.SaveChangesAsync();

        //     await _userService.AddWatchedFilm(user.Id, new AddWatchedFilmDto {
        //         FilmId = film.Id
        //     });

        //     var userFromDB = await _userService.GetById(user.Id);
        //     Assert.That(userFromDB.WatchedFilmCount, Is.EqualTo(1));

        // }
    }
}