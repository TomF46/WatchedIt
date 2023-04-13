using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public void dispose()
        {
            _context.FilmLists.RemoveRange(_context.FilmLists);
            _context.Films.RemoveRange(_context.Films);
            _context.People.RemoveRange(_context.People);
            _context.SaveChanges();
        }

        [Test]
        public async Task CanAddFilmList(){
            var user = RandomDataGenerator.GenerateUser();
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            Assert.DoesNotThrowAsync(async () => {
                var list = new AddFilmListDto {
                    Name = "My film list",
                    Description = "A list of my fave films"
                };

                await _filmListService.Add(user.Id, list);
            });
        }

        [Test]
        public async Task CanGetExistingFilmList(){
            var user = RandomDataGenerator.GenerateUser();
            var list = RandomDataGenerator.GenerateFilmList(user);
            _context.Users.Add(user);
            _context.FilmLists.Add(list);
            await _context.SaveChangesAsync();

            var listFromDb = await _filmListService.GetById(list.Id);
            Assert.That(listFromDb.Id, Is.EqualTo(list.Id));
        }

        [Test]
        public async Task CanGetMultipleFilmLists(){
            var user = RandomDataGenerator.GenerateUser();
            var list = RandomDataGenerator.GenerateFilmList(user);
            var list2 = RandomDataGenerator.GenerateFilmList(user);
            _context.Users.Add(user);
            _context.FilmLists.Add(list);
            _context.FilmLists.Add(list2);
            await _context.SaveChangesAsync();

            var listsFromDb = await _filmListService.GetAll(new FilmListSearchWithPaginationParameters());
            Assert.That(listsFromDb.Data.Count(), Is.EqualTo(2));
        }

        [Test]
        public async Task canUpdateFilmList(){
            var user = RandomDataGenerator.GenerateUser();
            var list = RandomDataGenerator.GenerateFilmList(user);
            _context.Users.Add(user);
            _context.FilmLists.Add(list);
            await _context.SaveChangesAsync();

            var updatedList = new UpdateFilmListDto{
                Name = "My updated list",
                Description = "With a new description"
            };
            await _filmListService.Update(list.Id, user.Id, updatedList);
            var listFromDb = await _filmListService.GetById(list.Id);
            Assert.That(listFromDb.Name, Is.EqualTo(updatedList.Name));

        }

        [Test]
        public async Task canDeleteFilmList(){
            var user = RandomDataGenerator.GenerateUser();
            var list = RandomDataGenerator.GenerateFilmList(user);
            _context.Users.Add(user);
            _context.FilmLists.Add(list);
            await _context.SaveChangesAsync();

            _filmListService.Delete(list.Id, user.Id);
            
            Assert.ThrowsAsync<NotFoundException>(async () =>
            {
                await _filmListService.GetById(list.Id);
            });
        }

        [Test]
        public async Task canAddFilmToFilmList(){
            var user = RandomDataGenerator.GenerateUser();
            var list = RandomDataGenerator.GenerateFilmList(user);
            var film = RandomDataGenerator.GenerateFilm();
            _context.Users.Add(user);
            _context.FilmLists.Add(list);
            _context.Films.Add(film);
            await _context.SaveChangesAsync();

            var toAdd = new AddFilmToFilmListDto{
                FilmId = film.Id
            };

            Assert.That(list.Films.Count(), Is.EqualTo(0));

            await _filmListService.AddFilmToListById(list.Id, user.Id, toAdd);
            
            Assert.That(list.Films.Count(), Is.EqualTo(1));
        }

        [Test]
        public async Task canRemoveFilmFromFilmList(){
            var user = RandomDataGenerator.GenerateUser();
            var list = RandomDataGenerator.GenerateFilmList(user);
            var film = RandomDataGenerator.GenerateFilm();
            _context.Users.Add(user);
            _context.FilmLists.Add(list);
            _context.Films.Add(film);
            list.Films.Add(film);
            await _context.SaveChangesAsync();

            var toRemove = new RemoveFilmForFilmListDto{
                FilmId = film.Id
            };

            Assert.That(list.Films.Count(), Is.EqualTo(1));

            await _filmListService.RemoveFilmFromListById(list.Id, user.Id, toRemove);
            
            Assert.That(list.Films.Count(), Is.EqualTo(0));
        }

        [Test]
        public async Task cantAddFilmToFilmListNotOwnedByUser(){
            var user = RandomDataGenerator.GenerateUser();
            var user2 = RandomDataGenerator.GenerateUser();
            var list = RandomDataGenerator.GenerateFilmList(user);
            var film = RandomDataGenerator.GenerateFilm();
            _context.Users.Add(user);
            _context.Users.Add(user2);
            _context.FilmLists.Add(list);
            _context.Films.Add(film);
            await _context.SaveChangesAsync();

            var toAdd = new AddFilmToFilmListDto{
                FilmId = film.Id
            };


            Assert.ThrowsAsync<Api.Exceptions.UnauthorizedAccessException>(async () =>
            {
                await _filmListService.AddFilmToListById(list.Id, user2.Id, toAdd);
            });
        }

        
    }
}