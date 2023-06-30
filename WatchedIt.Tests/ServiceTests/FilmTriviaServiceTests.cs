using Data;
using WatchedIt.Api.Exceptions;
using WatchedIt.Api.Models;
using WatchedIt.Api.Models.FilmTrivia;
using WatchedIt.Api.Services.FilmTriviaService;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
    [TestFixture]
    public class FilmTriviaServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly IFilmTriviaService _filmTriviaService;

        public FilmTriviaServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _filmTriviaService = new FilmTriviaService(_context);
        }
        
        [SetUp]
        public void Setup()
        {
            _context.Films.RemoveRange(_context.Films);
            _context.Users.RemoveRange(_context.Users);
            _context.FilmTrivias.RemoveRange(_context.FilmTrivias);
            _context.SaveChanges();
        }

        [TearDown]
        public void Dispose()
        {
            _context.Films.RemoveRange(_context.Films);
            _context.Users.RemoveRange(_context.Users);
            _context.FilmTrivias.RemoveRange(_context.FilmTrivias);
            _context.SaveChanges();
        }

        [Test]
        public async Task CanAddFilmTrivia(){
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();

            await _context.Films.AddAsync(film);
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            Assert.DoesNotThrowAsync(async () => {
                var filmTrivia = new AddFilmTriviaDto{
                    Text = "Directors first feature film."
                };

                await _filmTriviaService.Add(film.Id,user.Id, filmTrivia);
            });
        }

        [Test]
        public async Task CanGetSingleFilmTrivia(){
            var filmTrivia = RandomDataGenerator.GenerateFilmTrivia();
            await _context.FilmTrivias.AddAsync(filmTrivia);
            await _context.SaveChangesAsync();

            var filmTriviaFromDb = await _filmTriviaService.GetById(filmTrivia.Id);
            Assert.That(filmTriviaFromDb.Id, Is.EqualTo(filmTrivia.Id)); 
        }

        [Test]
        public async Task CanGetAllFilmTriviaForFilm(){
            var user1 = RandomDataGenerator.GenerateUser();
            var user2 = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            var film2 = RandomDataGenerator.GenerateFilm();
            var filmTrivia1 = RandomDataGenerator.GenerateFilmTrivia(film, user1);
            var filmTrivia2 = RandomDataGenerator.GenerateFilmTrivia(film2, user1);
            var filmTrivia3 = RandomDataGenerator.GenerateFilmTrivia(film, user2);

            await _context.Films.AddAsync(film);
            await _context.Films.AddAsync(film2);
            await _context.Users.AddAsync(user1);
            await _context.Users.AddAsync(user2);
            await _context.FilmTrivias.AddAsync(filmTrivia1);
            await _context.FilmTrivias.AddAsync(filmTrivia2);
            await _context.FilmTrivias.AddAsync(filmTrivia3);
            await _context.SaveChangesAsync();

            var pagination = new PaginationParameters{
                PageNumber = 1,
                PageSize = 20
            };

            var filmTrivias = await _filmTriviaService.GetAllForFilm(film.Id, pagination);
            Assert.That(filmTrivias.Data, Has.Count.EqualTo(2));
        }

        [Test]
        public async Task CanUpdateFilmTrivia(){
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            var filmTrivia = RandomDataGenerator.GenerateFilmTrivia(film, user);
            filmTrivia.Text = "Almost got cancelled before the premier.";

            await _context.Films.AddAsync(film);
            await _context.Users.AddAsync(user);
            await _context.FilmTrivias.AddAsync(filmTrivia);
            await _context.SaveChangesAsync();

            var newText = "It was cancelled before the premier.";

            var updatedFilmTrivia = new UpdateFilmTriviaDto{
                Text = newText
            };

            await _filmTriviaService.Update(filmTrivia.Id, user.Id, updatedFilmTrivia);
            
            var filmTriviaFromDb = await _filmTriviaService.GetById(filmTrivia.Id);
            Assert.That(filmTriviaFromDb.Text, Is.EqualTo(newText));
        }

        [Test]
        public async Task CanDeleteFilmTrivia(){
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            var filmTrivia = RandomDataGenerator.GenerateFilmTrivia(film, user);
            await _context.Films.AddAsync(film);
            await _context.Users.AddAsync(user);
            await _context.FilmTrivias.AddAsync(filmTrivia);
            await _context.SaveChangesAsync();

            _filmTriviaService.Delete(filmTrivia.Id, user.Id);

            Assert.ThrowsAsync<NotFoundException>(async () =>
            {
                await _filmTriviaService.GetById(filmTrivia.Id);
            });
        }
    }
}