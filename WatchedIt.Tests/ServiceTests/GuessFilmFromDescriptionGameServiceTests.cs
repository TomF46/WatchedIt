using Data;

using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.Games.GuessFilmFromDescription;
using WatchedIt.Api.Services.Games.GuessFilmFromDescription;
using WatchedIt.Tests.ServiceTests.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace WatchedIt.Tests.ServiceTests
{
    [TestFixture]
    public class GuessFilmFromDescriptionGameServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly IGuessFilmFromDescriptionGameService _service;

        public GuessFilmFromDescriptionGameServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _service = new GuessFilmFromDescriptionGameService(_context);
        }
        
        [SetUp]
        public void Setup()
        {
            _context.Users.RemoveRange(_context.Users);
            _context.Credits.RemoveRange(_context.Credits);
            _context.Films.RemoveRange(_context.Films);
            _context.People.RemoveRange(_context.People);
            _context.GuessFilmFromDescriptionGames.RemoveRange(_context.GuessFilmFromDescriptionGames);
            _context.SaveChanges();
        }

        [TearDown]
        public void Dispose()
        {
            _context.Users.RemoveRange(_context.Users);
            _context.Credits.RemoveRange(_context.Credits);
            _context.Films.RemoveRange(_context.Films);
            _context.People.RemoveRange(_context.People);
            _context.GuessFilmFromDescriptionGames.RemoveRange(_context.GuessFilmFromDescriptionGames);
            _context.SaveChanges();
        }

        [Test]
        public async Task CanStartGame(){
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            var film2 = RandomDataGenerator.GenerateFilm();
            _context.Users.Add(user);
            _context.Films.Add(film);
            _context.Films.Add(film2);
            await _context.SaveChangesAsync();

            Assert.DoesNotThrowAsync(async () => await _service.StartGame(user.Id));
        }

        [Test]
        public async Task CanGuessCorrectRoundAnswer(){
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            _context.Users.Add(user);
            _context.Films.Add(film);
            await _context.SaveChangesAsync();

            var game = await _service.StartGame(user.Id);
            Assert.That(game.Status, Is.EqualTo(GameStatus.InProgress));

            game = await _service.Guess(game.Id, user.Id, new GuessFilmFromDescriptionGameGuessDto{
                RoundId = game.Rounds.First().Id,
                FilmId = film.Id
            });
            Assert.That(game.Rounds.First().Status, Is.EqualTo(GameRoundStatus.CompletedSuccess));
        }

        [Test]
        public async Task NewClueIsAddedIfGuessIsIncorrect()
        {
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            var film2 = RandomDataGenerator.GenerateFilm();
            _context.Users.Add(user);
            _context.Films.Add(film);
            _context.Films.Add(film2);
            await _context.SaveChangesAsync();

            var game = await _service.StartGame(user.Id);
            var gameFromDb = _context.GuessFilmFromDescriptionGames.Include(x => x.Rounds).ThenInclude(x => x.Film).First(x => x.Id == game.Id);
            Assert.That(game.Status, Is.EqualTo(GameStatus.InProgress));

            game = await _service.Guess(game.Id, user.Id, new GuessFilmFromDescriptionGameGuessDto{
                RoundId = gameFromDb.Rounds.First().Id,
                FilmId = gameFromDb.Rounds.First().Film.Id
            });

            Assert.Multiple(() =>
            {
                Assert.That(game.Status, Is.EqualTo(GameStatus.InProgress));
                Assert.That(game.Rounds, Has.Count.EqualTo(2));
            });
        }

        [Test]
        public async Task GameOverStateIfUserGuessesWrong()
        {
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            var film2 = RandomDataGenerator.GenerateFilm();
            _context.Users.Add(user);
            _context.Films.Add(film);
            _context.Films.Add(film2);
            await _context.SaveChangesAsync();

            var game = await _service.StartGame(user.Id);
            var gameFromDb = _context.GuessFilmFromDescriptionGames.Include(x => x.Rounds).ThenInclude(x => x.Film).First(x => x.Id == game.Id);
            Assert.That(game.Status, Is.EqualTo(GameStatus.InProgress));

            game = await _service.Guess(game.Id, user.Id, new GuessFilmFromDescriptionGameGuessDto{
                RoundId = game.Rounds.First().Id,
                FilmId = gameFromDb.Rounds.First().Film.Id + 1 // Increment correct Id to ensure is is incorrect
            });
            Assert.That(game.Status, Is.EqualTo(GameStatus.CompletedSuccess));            
        }

        [Test]
        public async Task CanForefeitGame()
        {
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            _context.Users.Add(user);
            _context.Films.Add(film);
            await _context.SaveChangesAsync();

            var game = await _service.StartGame(user.Id);
            Assert.That(game.Status, Is.EqualTo(GameStatus.InProgress));

            game = await _service.Forfeit(game.Id, user.Id);
            Assert.That(game.Status, Is.EqualTo(GameStatus.Forfeit));
        }
    }
}