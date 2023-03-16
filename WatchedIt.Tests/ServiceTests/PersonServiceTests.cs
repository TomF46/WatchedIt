using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using NUnit.Framework;
using WatchedIt.Api.Exceptions;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Services.PersonService;

namespace WatchedIt.Tests.ServiceTests
{
    public class PersonServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly IPersonService _personService;

        public PersonServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _personService = new PersonService(_context);
        }
        [SetUp]
        public void Setup()
        {
            _context.People.RemoveRange(_context.People);
            _context.SaveChanges();
        }

        [TearDown]
        public void dispose()
        {
            _context.People.RemoveRange(_context.People);
            _context.SaveChanges();
        }

        [Test]
        public void CanAddPerson()
        {
            Assert.DoesNotThrow(() => {
                var person = new AddPersonDto {
                    FirstName = "Joe",
                    LastName = "Bloggs",
                    Age = 25,
                    Description = "A young actor"
                };

                _personService.Add(person);
            });
        }

        [Test]
        public async Task CanGetExistingPerson()
        {
            var person = new AddPersonDto {
                FirstName = "Joe",
                LastName = "Bloggs",
                Age = 25,
                Description = "A young actor"
            };

            var existingPerson =await _personService.Add(person);

            var personFromDb = await _personService.GetById(existingPerson.Id);

            Assert.That(personFromDb.Id, Is.EqualTo(existingPerson.Id));
        }

        [Test]
        public async Task CanGetMultiplePeople()
        {
            await _personService.Add(new AddPersonDto {
                FirstName = "Joe",
                LastName = "Bloggs",
                Age = 25,
                Description = "A young actor"
            });

            await _personService.Add(new AddPersonDto {
                FirstName = "Dave",
                LastName = "Davison",
                Age = 99,
                Description = "An old actor"
            });

            var allPeople = await _personService.GetAll();

            Assert.That(allPeople.Count(), Is.EqualTo(2));
        }

        [Test]
        public void CanDeletePerson()
        {
            var person = new Person
            {
                FirstName = "Joe",
                LastName = "Bloggs",
                Age = 25,
                Description = "A young actor"
            };

            _context.People.Add(person);
            _context.SaveChanges();

            _personService.Delete(person.Id);

            Assert.ThrowsAsync<NotFoundException>(async () =>
            {
                await _personService.GetById(person.Id);
            });
        }

        [Test]
        public async Task CanUpdatePerson()
        {
            var person = new Person
            {
                FirstName = "Joe",
                LastName = "Bloggs",
                Age = 25,
                Description = "A young actor"
            };

            _context.People.Add(person);
            _context.SaveChanges();

            var newName = "Joel";

            var updatedPerson = new UpdatePersonDto{
                FirstName = newName,
                LastName = "Bloggs",
                Age = 25,
                Description = "A young actor"
            };

            await _personService.Update(person.Id, updatedPerson);
            
            var personFromDB = await _personService.GetById(person.Id);

            Assert.That(personFromDB.Id, Is.EqualTo(person.Id));
            Assert.That(personFromDB.FirstName, Is.EqualTo(newName));
        }

        [Test]
        public async  Task CanAddWatchedFilm(){
            var person = new Person
            {
                FirstName = "Joe",
                LastName = "Bloggs",
                Age = 25,
                Description = "A young actor"
            };

            var film = new Film
            {
                Name = "Jaws",
                ShortDescription = "Its about a shark",
                FullDescription = "A full description for a film about a shark.",
                Runtime = 100
            };

            _context.Films.Add(film);
            _context.People.Add(person);
            _context.SaveChanges();

            await _personService.AddWatchedFilm(person.Id, new AddWatchedFilmDto {
                Id = film.Id
            });

            var personFromDB = await _personService.GetById(person.Id);
            Assert.That(personFromDB.Watched.Count(), Is.EqualTo(1));

        }

        [Test]
        public async  Task CanRemoveWatchedFilm(){
            var person = new Person
            {
                FirstName = "Joe",
                LastName = "Bloggs",
                Age = 25,
                Description = "A young actor"
            };

            var film = new Film
            {
                Name = "Jaws",
                ShortDescription = "Its about a shark",
                FullDescription = "A full description for a film about a shark.",
                Runtime = 100
            };

            _context.Films.Add(film);
            _context.People.Add(person);
            _context.SaveChanges();

            await _personService.AddWatchedFilm(person.Id, new AddWatchedFilmDto {
                Id = film.Id
            });

            var personFromDB = await _personService.GetById(person.Id);
            Assert.That(personFromDB.Watched.Count(), Is.EqualTo(1));

            await _personService.RemoveWatchedFilm(person.Id, new RemoveWatchedFilmDto {
                Id = film.Id
            });

            personFromDB = await _personService.GetById(person.Id);
            Assert.That(personFromDB.Watched.Count(), Is.EqualTo(0));
        }
    }
}