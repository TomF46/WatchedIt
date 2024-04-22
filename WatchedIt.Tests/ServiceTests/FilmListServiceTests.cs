using Data;

using WatchedIt.Api.Exceptions;
using WatchedIt.Api.Models;
using WatchedIt.Api.Models.FilmListModels;
using WatchedIt.Api.Services.FilmListService;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
    [TestFixture]
    public class FilmListServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly IFilmListService _filmListService;

        public FilmListServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _filmListService = new FilmListService(_context);
        }

        [SetUp]
        public void Setup()
        {
            _context.FilmLists.RemoveRange(_context.FilmLists);
            _context.Films.RemoveRange(_context.Films);
            _context.People.RemoveRange(_context.People);
            _context.SaveChanges();
        }

        [TearDown]
        public void Dispose()
        {
            _context.FilmLists.RemoveRange(_context.FilmLists);
            _context.Films.RemoveRange(_context.Films);
            _context.People.RemoveRange(_context.People);
            _context.SaveChanges();
        }

        [Test]
        public async Task CanAddFilmList()
        {
            var user = RandomDataGenerator.GenerateUser();
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            Assert.DoesNotThrowAsync(async () =>
            {
                var list = new AddFilmListDto
                {
                    Name = "My film list",
                    Description = "A list of my fave films"
                };

                await _filmListService.Add(user.Id, list);
            });
        }

        [Test]
        public async Task CanGetExistingFilmList()
        {
            var user = RandomDataGenerator.GenerateUser();
            var list = RandomDataGenerator.GenerateFilmList(user);
            _context.Users.Add(user);
            _context.FilmLists.Add(list);
            await _context.SaveChangesAsync();

            var parameters = new FilmSearchWithPaginationParameters();
            var listFromDb = await _filmListService.GetById(list.Id, parameters);
            Assert.That(listFromDb.Id, Is.EqualTo(list.Id));
        }

        [Test]
        public async Task CanGetMultipleFilmLists()
        {
            var user = RandomDataGenerator.GenerateUser();
            var list = RandomDataGenerator.GenerateFilmList(user);
            var list2 = RandomDataGenerator.GenerateFilmList(user);
            _context.Users.Add(user);
            _context.FilmLists.Add(list);
            _context.FilmLists.Add(list2);
            await _context.SaveChangesAsync();

            var listsFromDb = await _filmListService.GetAll(new FilmListSearchWithPaginationParameters());
            Assert.That(listsFromDb.Data, Has.Count.EqualTo(2));
        }

        [Test]
        public async Task CanUpdateFilmList()
        {
            var user = RandomDataGenerator.GenerateUser();
            var list = RandomDataGenerator.GenerateFilmList(user);
            _context.Users.Add(user);
            _context.FilmLists.Add(list);
            await _context.SaveChangesAsync();

            var updatedList = new UpdateFilmListDto
            {
                Name = "My updated list",
                Description = "With a new description"
            };
            await _filmListService.Update(list.Id, user.Id, updatedList);
            var parameters = new FilmSearchWithPaginationParameters();
            var listFromDb = await _filmListService.GetById(list.Id, parameters);
            Assert.That(listFromDb.Name, Is.EqualTo(updatedList.Name));

        }

        [Test]
        public async Task CanDeleteFilmList()
        {
            var user = RandomDataGenerator.GenerateUser();
            var list = RandomDataGenerator.GenerateFilmList(user);
            _context.Users.Add(user);
            _context.FilmLists.Add(list);
            await _context.SaveChangesAsync();

            _filmListService.Delete(list.Id, user.Id);

            Assert.ThrowsAsync<NotFoundException>(async () =>
            {
                var parameters = new FilmSearchWithPaginationParameters();
                await _filmListService.GetById(list.Id, parameters);
            });
        }

        [Test]
        public async Task CanAddFilmToFilmList()
        {
            var user = RandomDataGenerator.GenerateUser();
            var list = RandomDataGenerator.GenerateFilmList(user);
            var film = RandomDataGenerator.GenerateFilm();
            _context.Users.Add(user);
            _context.FilmLists.Add(list);
            _context.Films.Add(film);
            await _context.SaveChangesAsync();

            var toAdd = new AddFilmToFilmListDto
            {
                FilmId = film.Id
            };

            Assert.That(list.Films, Is.Empty);

            await _filmListService.AddFilmToListById(list.Id, user.Id, toAdd);

            Assert.That(list.Films, Has.Count.EqualTo(1));
        }

        [Test]
        public async Task CanRemoveFilmFromFilmList()
        {
            var user = RandomDataGenerator.GenerateUser();
            var list = RandomDataGenerator.GenerateFilmList(user);
            var film = RandomDataGenerator.GenerateFilm();
            _context.Users.Add(user);
            _context.FilmLists.Add(list);
            _context.Films.Add(film);
            list.Films.Add(film);
            await _context.SaveChangesAsync();

            var toRemove = new RemoveFilmForFilmListDto
            {
                FilmId = film.Id
            };

            Assert.That(list.Films, Has.Count.EqualTo(1));

            await _filmListService.RemoveFilmFromListById(list.Id, user.Id, toRemove);

            Assert.That(list.Films, Is.Empty);
        }

        [Test]
        public async Task CantAddFilmToFilmListNotOwnedByUser()
        {
            var user = RandomDataGenerator.GenerateUser();
            var user2 = RandomDataGenerator.GenerateUser();
            var list = RandomDataGenerator.GenerateFilmList(user);
            var film = RandomDataGenerator.GenerateFilm();
            _context.Users.Add(user);
            _context.Users.Add(user2);
            _context.FilmLists.Add(list);
            _context.Films.Add(film);
            await _context.SaveChangesAsync();

            var toAdd = new AddFilmToFilmListDto
            {
                FilmId = film.Id
            };


            Assert.ThrowsAsync<Api.Exceptions.UnauthorizedAccessException>(async () =>
            {
                await _filmListService.AddFilmToListById(list.Id, user2.Id, toAdd);
            });
        }


    }
}