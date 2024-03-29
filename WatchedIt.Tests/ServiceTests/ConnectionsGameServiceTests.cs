using Data;

using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.Games.Connections;
using WatchedIt.Api.Services.Games.Connections;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
    [TestFixture]
    public class ConnectionsGameServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly IConnectionsGameService _service;

        public ConnectionsGameServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _service = new ConnectionsGameService(_context);
        }
        
        [SetUp]
        public void Setup()
        {
            _context.Users.RemoveRange(_context.Users);
            _context.Credits.RemoveRange(_context.Credits);
            _context.Films.RemoveRange(_context.Films);
            _context.People.RemoveRange(_context.People);
            _context.ConnectionsGames.RemoveRange(_context.ConnectionsGames);
            _context.SaveChanges();
        }

        [TearDown]
        public void Dispose()
        {
            _context.Users.RemoveRange(_context.Users);
            _context.Credits.RemoveRange(_context.Credits);
            _context.Films.RemoveRange(_context.Films);
            _context.People.RemoveRange(_context.People);
            _context.ConnectionsGames.RemoveRange(_context.ConnectionsGames);
            _context.SaveChanges();
        }

        [Test]
        public async Task CanStartGame(){
            var user = RandomDataGenerator.GenerateUser();
            var person = RandomDataGenerator.GeneratePerson();
            var person2 = RandomDataGenerator.GeneratePerson();
            var person3 = RandomDataGenerator.GeneratePerson();
            var film = RandomDataGenerator.GenerateFilm();
            var credit1 = RandomDataGenerator.GenerateCredit(person, film);
            var credit2 = RandomDataGenerator.GenerateCredit(person2, film);
            var credit3 = RandomDataGenerator.GenerateCredit(person3, film);
            _context.Users.Add(user);
            _context.Films.Add(film);
            _context.People.Add(person);
            _context.People.Add(person2);
            _context.People.Add(person3);
            _context.Credits.Add(credit1);
            _context.Credits.Add(credit2);
            _context.Credits.Add(credit3);
            await _context.SaveChangesAsync();

            Assert.DoesNotThrowAsync(async () => await _service.StartGame(user.Id));
        }

        [Test]
        public async Task CanGuessCorrectAnswer(){
            var user = RandomDataGenerator.GenerateUser();
            var person = RandomDataGenerator.GeneratePerson();
            var person2 = RandomDataGenerator.GeneratePerson();
            var person3 = RandomDataGenerator.GeneratePerson();
            var film = RandomDataGenerator.GenerateFilm();
            var credit1 = RandomDataGenerator.GenerateCredit(person, film);
            var credit2 = RandomDataGenerator.GenerateCredit(person2, film);
            var credit3 = RandomDataGenerator.GenerateCredit(person3, film);
            _context.Users.Add(user);
            _context.Films.Add(film);
            _context.People.Add(person);
            _context.People.Add(person2);
            _context.People.Add(person3);
            _context.Credits.Add(credit1);
            _context.Credits.Add(credit2);
            _context.Credits.Add(credit3);
            await _context.SaveChangesAsync();

            var game = await _service.StartGame(user.Id);
            Assert.That(game.Status, Is.EqualTo(GameStatus.InProgress));

            var gameFromDb = _context.ConnectionsGames.FirstOrDefault(x => x.Id == game.Id);

            game = await _service.Guess(game.Id, user.Id, new GuessPersonForConnectionGameDto {
                PersonId = gameFromDb.Person.Id
            });
            Assert.That(game.Status, Is.EqualTo(GameStatus.CompletedSuccess));
        }

        [Test]
        public async Task NewClueIsAddedIfGuessIsIncorrect()
        {
            var user = RandomDataGenerator.GenerateUser();
            var person = RandomDataGenerator.GeneratePerson();
            var person2 = RandomDataGenerator.GeneratePerson();
            var person3 = RandomDataGenerator.GeneratePerson();
            var film = RandomDataGenerator.GenerateFilm();
            var credit1 = RandomDataGenerator.GenerateCredit(person, film);
            var credit2 = RandomDataGenerator.GenerateCredit(person2, film);
            var credit3 = RandomDataGenerator.GenerateCredit(person3, film);
            _context.Users.Add(user);
            _context.Films.Add(film);
            _context.People.Add(person);
            _context.People.Add(person2);
            _context.People.Add(person3);
            _context.Credits.Add(credit1);
            _context.Credits.Add(credit2);
            _context.Credits.Add(credit3);
            await _context.SaveChangesAsync();

            var game = await _service.StartGame(user.Id);

            Assert.Multiple(() =>
            {
                Assert.That(game.Status, Is.EqualTo(GameStatus.InProgress));
                Assert.That(game.Clues, Has.Count.EqualTo(1));
            });

            var gameFromDb = _context.ConnectionsGames.FirstOrDefault(x => x.Id == game.Id);

            //Add number to correct id to ensure we dont accidently guess the Id.
            game = await _service.Guess(game.Id, user.Id, new GuessPersonForConnectionGameDto {
                PersonId = gameFromDb.Person.Id + 1
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
            var person3 = RandomDataGenerator.GeneratePerson();
            var film = RandomDataGenerator.GenerateFilm();
            var credit1 = RandomDataGenerator.GenerateCredit(person, film);
            var credit2 = RandomDataGenerator.GenerateCredit(person2, film);
            var credit3 = RandomDataGenerator.GenerateCredit(person3, film);
            _context.Users.Add(user);
            _context.Films.Add(film);
            _context.People.Add(person);
            _context.People.Add(person2);
            _context.People.Add(person3);
            _context.Credits.Add(credit1);
            _context.Credits.Add(credit2);
            _context.Credits.Add(credit3);
            await _context.SaveChangesAsync();

            var game = await _service.StartGame(user.Id);
            Assert.That(game.Status, Is.EqualTo(GameStatus.InProgress));

            var gameFromDb = _context.ConnectionsGames.FirstOrDefault(x => x.Id == game.Id);

            //Add number to correct id to ensure we dont accidently guess the Id.
            game = await _service.Guess(game.Id, user.Id, new GuessPersonForConnectionGameDto {
                PersonId = gameFromDb.Person.Id + 1
            });

            game = await _service.Guess(game.Id, user.Id, new GuessPersonForConnectionGameDto {
                PersonId = gameFromDb.Person.Id + 2
            });
            // Film only has two credits that arent the person being guessed, so after 2 failed guesses no more clues are available and its game over.
            Assert.That(game.Status, Is.EqualTo(GameStatus.CompletedFail));
        }

        [Test]
        public async Task CanForefeitGame()
        {
            var user = RandomDataGenerator.GenerateUser();
            var person = RandomDataGenerator.GeneratePerson();
            var person2 = RandomDataGenerator.GeneratePerson();
            var person3 = RandomDataGenerator.GeneratePerson();
            var film = RandomDataGenerator.GenerateFilm();
            var credit1 = RandomDataGenerator.GenerateCredit(person, film);
            var credit2 = RandomDataGenerator.GenerateCredit(person2, film);
            var credit3 = RandomDataGenerator.GenerateCredit(person3, film);
            _context.Users.Add(user);
            _context.Films.Add(film);
            _context.People.Add(person);
            _context.People.Add(person2);
            _context.People.Add(person3);
            _context.Credits.Add(credit1);
            _context.Credits.Add(credit2);
            _context.Credits.Add(credit3);
            await _context.SaveChangesAsync();

            var game = await _service.StartGame(user.Id);
            Assert.That(game.Status, Is.EqualTo(GameStatus.InProgress));

            game = await _service.Forfeit(game.Id, user.Id);
            Assert.That(game.Status, Is.EqualTo(GameStatus.Forfeit));
        }
    }
}