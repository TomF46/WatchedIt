using Data;

using WatchedIt.Api.Models;
using WatchedIt.Api.Models.News;
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
        public void Dispose()
        {
            _context.Users.RemoveRange(_context.Users);
            _context.SaveChanges();
        }

        [Test]
        public async Task CanGetExistingUser()
        {
            var user = RandomDataGenerator.GenerateUser();
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var userFromDb = await _userService.GetById(user.Id);

            Assert.That(userFromDb.Id, Is.EqualTo(user.Id));
        }

        [Test]
        public async Task ReturnsUserNotAdminWhenNotAdmin()
        {
            var user = RandomDataGenerator.GenerateUser();
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var isAdmin = await _userService.GetIsUserAdmin(user.Id);
            Assert.That(isAdmin.IsAdmin, Is.False);
        }

        [Test]
        public async Task ReturnsUserIsAdminWhenIsAdmin()
        {
            var user = RandomDataGenerator.GenerateAdminUser();
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var isAdmin = await _userService.GetIsUserAdmin(user.Id);
            Assert.That(isAdmin.IsAdmin, Is.True);
        }

        [Test]
        public async Task CanGetWatchedFilms()
        {
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            var film2 = RandomDataGenerator.GenerateFilm();
            await _context.Users.AddAsync(user);
            await _context.Films.AddAsync(film);
            await _context.Films.AddAsync(film2);
            user.Watched.Add(film);
            user.Watched.Add(film2);
            await _context.SaveChangesAsync();

            var watchedFilms = await _userService.GetWatchedFilms(user.Id, new FilmSearchWithPaginationParameters());
            Assert.That(watchedFilms.Data, Has.Count.EqualTo(2));
        }

        [Test]
        public async Task CanSetCanPublishTrue()
        {
            var user = RandomDataGenerator.GenerateUser();
            user.CanPublish = false;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var updatedUser = await _userService.SetUserCanPublish(user.Id, new UserCanPublishDto { UserCanPublish = true });
            Assert.That(updatedUser.CanPublish, Is.True);
        }

        [Test]
        public async Task CanSetCanPublishFalse()
        {
            var user = RandomDataGenerator.GenerateUser();
            user.CanPublish = true;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var updatedUser = await _userService.SetUserCanPublish(user.Id, new UserCanPublishDto { UserCanPublish = false });
            Assert.That(updatedUser.CanPublish, Is.False);
        }


        [Test]
        public async Task CanGetCanPublishTrue()
        {
            var user = RandomDataGenerator.GenerateUser();
            user.CanPublish = true;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var response = await _userService.GetCanPublish(user.Id);
            Assert.That(response.CanPublish, Is.True);
        }

        [Test]
        public async Task CanGetCanPublishFalse()
        {
            var user = RandomDataGenerator.GenerateUser();
            user.CanPublish = false;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var response = await _userService.GetCanPublish(user.Id);
            Assert.That(response.CanPublish, Is.False);
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