using Data;

using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.Games.GuessFilmFromCast;
using WatchedIt.Api.Services.Games.GuessFilmFromCast;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
    [TestFixture]
    public class GuessFilmFromCastGameServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly IGuessFilmFromCastGameService _service;

        public GuessFilmFromCastGameServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _service = new GuessFilmFromCastGameService(_context);
        }
        
        [SetUp]
        public void Setup()
        {
            _context.Users.RemoveRange(_context.Users);
            _context.Credits.RemoveRange(_context.Credits);
            _context.Films.RemoveRange(_context.Films);
            _context.People.RemoveRange(_context.People);
            _context.SaveChanges();
        }

        [TearDown]
        public void Dispose()
        {
            _context.Users.RemoveRange(_context.Users);
            _context.Credits.RemoveRange(_context.Credits);
            _context.Films.RemoveRange(_context.Films);
            _context.People.RemoveRange(_context.People);
            _context.SaveChanges();
        }

        [Test]
        public async Task CanStartGame(){
            var user = RandomDataGenerator.GenerateUser();
            var person = RandomDataGenerator.GeneratePerson();
            var person2 = RandomDataGenerator.GeneratePerson();
            var film = RandomDataGenerator.GenerateFilm();
            var credit1 = RandomDataGenerator.GenerateCredit(person, film);
            var credit2 = RandomDataGenerator.GenerateCredit(person2, film);
            _context.Users.Add(user);
            _context.Films.Add(film);
            _context.People.Add(person);
            _context.People.Add(person2);
            _context.Credits.Add(credit1);
            _context.Credits.Add(credit2);
            await _context.SaveChangesAsync();

            Assert.DoesNotThrowAsync(async () => await _service.StartGame(user.Id));
        }

        [Test]
        public async Task CanGuessCorrectAnswer(){
            var user = RandomDataGenerator.GenerateUser();
            var person = RandomDataGenerator.GeneratePerson();
            var person2 = RandomDataGenerator.GeneratePerson();
            var film = RandomDataGenerator.GenerateFilm();
            var credit1 = RandomDataGenerator.GenerateCredit(person, film);
            var credit2 = RandomDataGenerator.GenerateCredit(person2, film);
            _context.Users.Add(user);
            _context.Films.Add(film);
            _context.People.Add(person);
            _context.People.Add(person2);
            _context.Credits.Add(credit1);
            _context.Credits.Add(credit2);
            await _context.SaveChangesAsync();

            var game = await _service.StartGame(user.Id);
            Assert.That(game.Status, Is.EqualTo(GameStatus.InProgress));

            game = await _service.Guess(game.Id, user.Id, new GuessFilmFromCastGameGuessDto{
                FilmId = film.Id
            });
            Assert.That(game.Status, Is.EqualTo(GameStatus.CompletedSuccess));
        }

        [Test]
        public async Task NewClueIsAddedIfGuessIsIncorrect()
        {
            var user = RandomDataGenerator.GenerateUser();
            var person = RandomDataGenerator.GeneratePerson();
            var person2 = RandomDataGenerator.GeneratePerson();
            var film = RandomDataGenerator.GenerateFilm();
            var credit1 = RandomDataGenerator.GenerateCredit(person, film);
            var credit2 = RandomDataGenerator.GenerateCredit(person2, film);
            _context.Users.Add(user);
            _context.Films.Add(film);
            _context.People.Add(person);
            _context.People.Add(person2);
            _context.Credits.Add(credit1);
            _context.Credits.Add(credit2);
            await _context.SaveChangesAsync();

            var game = await _service.StartGame(user.Id);
            Assert.That(game.Status, Is.EqualTo(GameStatus.InProgress));

            //Add number to correct id to ensure we dont accidently guess the Id.
            game = await _service.Guess(game.Id, user.Id, new GuessFilmFromCastGameGuessDto{
                FilmId = film.Id + 2
            });

            Assert.Multiple(() =>
            {
                Assert.That(game.Status, Is.EqualTo(GameStatus.InProgress)); // Film has two credits so will still be in progress after 1 guess;
                Assert.That(game.Clues, Has.Count.EqualTo(2));
            });
        }

        [Test]
        public async Task GameOverStateIfUserCantGuessAfterFinalCredit()
        {
            var user = RandomDataGenerator.GenerateUser();
            var person = RandomDataGenerator.GeneratePerson();
            var person2 = RandomDataGenerator.GeneratePerson();
            var film = RandomDataGenerator.GenerateFilm();
            var credit1 = RandomDataGenerator.GenerateCredit(person, film);
            var credit2 = RandomDataGenerator.GenerateCredit(person2, film);
            _context.Users.Add(user);
            _context.Films.Add(film);
            _context.People.Add(person);
            _context.People.Add(person2);
            _context.Credits.Add(credit1);
            _context.Credits.Add(credit2);
            await _context.SaveChangesAsync();

            var game = await _service.StartGame(user.Id);
            Assert.That(game.Status, Is.EqualTo(GameStatus.InProgress));

            //Add number to correct id to ensure we dont accidently guess the Id.
            game = await _service.Guess(game.Id, user.Id, new GuessFilmFromCastGameGuessDto{
                FilmId = film.Id + 2
            });

            game = await _service.Guess(game.Id, user.Id, new GuessFilmFromCastGameGuessDto{
                FilmId = film.Id + 3
            });
            // Film only has two credits, so after 2 failed guesses no more clues are available and its game over.
            Assert.That(game.Status, Is.EqualTo(GameStatus.CompletedFail));
        }
    }
}