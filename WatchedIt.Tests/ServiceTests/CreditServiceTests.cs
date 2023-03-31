using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using WatchedIt.Api.Exceptions;
using WatchedIt.Api.Models.CreditModels;
using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Services.CreditService;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
    [TestFixture]
    public class CreditServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly ICreditService _creditService;
        public CreditServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _creditService = new CreditService(_context);
        }

        [SetUp]
        public void Setup()
        {
            _context.Credits.RemoveRange(_context.Credits);
            _context.Films.RemoveRange(_context.Films);
            _context.People.RemoveRange(_context.People);
            _context.SaveChanges();
        }

        [TearDown]
        public void dispose()
        {
            _context.Credits.RemoveRange(_context.Credits);
            _context.Films.RemoveRange(_context.Films);
            _context.People.RemoveRange(_context.People);
            _context.SaveChanges();
        }

        [Test]
        public async Task CanAddCredit(){
            var person = RandomDataGenerator.GeneratePerson();
            var film = RandomDataGenerator.GenerateFilm();
            _context.Films.Add(film);
            _context.People.Add(person);
            await _context.SaveChangesAsync();

            Assert.DoesNotThrowAsync(async () => {
                var credit = new AddCreditDto{
                    FilmId = film.Id,
                    PersonId = person.Id,
                    Role = "Main character",
                    Type = CreditType.Cast
                };

                await _creditService.Add(credit);
            });
        }

        [Test]
        public async Task CanGetExistingCredit(){
            var person = RandomDataGenerator.GeneratePerson();
            var film = RandomDataGenerator.GenerateFilm();
            _context.Films.Add(film);
            _context.People.Add(person);
            var credit = new Credit{
                Person = person,
                Film = film,
                Role = "Main character",
                Type = CreditType.Crew
            };
            _context.Credits.Add(credit);
            await _context.SaveChangesAsync();

            var creditFromDb = await _creditService.GetById(credit.Id);

            Assert.That(creditFromDb.Id, Is.EqualTo(credit.Id));
        }

        [Test]
        public async Task CanGetMultipleCredits(){
            var person = RandomDataGenerator.GeneratePerson();
            var person2 = RandomDataGenerator.GeneratePerson();
            var film = RandomDataGenerator.GenerateFilm();
            var credit1 = RandomDataGenerator.GenerateCredit(person, film);
            var credit2 = RandomDataGenerator.GenerateCredit(person2, film);
            _context.Films.Add(film);
            _context.People.Add(person);
            _context.People.Add(person2);
            _context.Credits.Add(credit1);
            _context.Credits.Add(credit2);
            await _context.SaveChangesAsync();

            var allCredits = await _creditService.GetAll();

            Assert.That(allCredits.Cast.Count(), Is.EqualTo(2));
        }

        [Test]
        public async Task CanUpdateCredit(){
            var person = RandomDataGenerator.GeneratePerson();
            var film = RandomDataGenerator.GenerateFilm();
            var credit = RandomDataGenerator.GenerateCredit(person, film);
            _context.Films.Add(film);
            _context.People.Add(person);
            _context.Credits.Add(credit);
            await _context.SaveChangesAsync();

            var updatedCredit = new UpdatedCreditDto {
                Role = "Hero",
                Type = CreditType.Cast
            };

            await _creditService.Update(credit.Id, updatedCredit);
            var creditFromDb = await _creditService.GetById(credit.Id);
            Assert.That(creditFromDb.Role, Is.EqualTo(updatedCredit.Role));
        }
        [Test]
        public async Task canDeleteCredit(){
            var person = RandomDataGenerator.GeneratePerson();
            var film = RandomDataGenerator.GenerateFilm();
            var credit = RandomDataGenerator.GenerateCredit(person, film);
            _context.Films.Add(film);
            _context.People.Add(person);
            _context.Credits.Add(credit);
            await _context.SaveChangesAsync();

            _creditService.Delete(credit.Id);

            Assert.ThrowsAsync<NotFoundException>(async () =>
            {
                await _creditService.GetById(film.Id);
            });
        }

        [Test]
        public async Task canGetCreditsForFilm(){
            var person = RandomDataGenerator.GeneratePerson();
            var person2 = RandomDataGenerator.GeneratePerson();
            var film = RandomDataGenerator.GenerateFilm();
            var film2 = RandomDataGenerator.GenerateFilm();
            var credit1 = RandomDataGenerator.GenerateCredit(person, film);
            var credit2 = RandomDataGenerator.GenerateCredit(person2, film);
            var credit3 = RandomDataGenerator.GenerateCredit(person2, film2);
            _context.Films.Add(film);
            _context.Films.Add(film2);
            _context.People.Add(person);
            _context.People.Add(person2);
            _context.Credits.Add(credit1);
            _context.Credits.Add(credit2);
            _context.Credits.Add(credit3);
            await _context.SaveChangesAsync();

            var filmCredits = await _creditService.GetCreditsForFilmById(film.Id);
            Assert.That(filmCredits.Cast.Count(), Is.EqualTo(2));
        }

        [Test]
        public async Task canGetCreditsForPerson(){
            var person = RandomDataGenerator.GeneratePerson();
            var person2 = RandomDataGenerator.GeneratePerson();
            var film = RandomDataGenerator.GenerateFilm();
            var film2 = RandomDataGenerator.GenerateFilm();
            var credit1 = RandomDataGenerator.GenerateCredit(person, film);
            var credit2 = RandomDataGenerator.GenerateCredit(person2, film);
            var credit3 = RandomDataGenerator.GenerateCredit(person2, film2);
            _context.Films.Add(film);
            _context.Films.Add(film2);
            _context.People.Add(person);
            _context.People.Add(person2);
            _context.Credits.Add(credit1);
            _context.Credits.Add(credit2);
            _context.Credits.Add(credit3);
            await _context.SaveChangesAsync();

            var personCredits = await _creditService.GetCreditsForPersonById(person.Id);
            Assert.That(personCredits.Cast.Count(), Is.EqualTo(1));
        }
    }
}