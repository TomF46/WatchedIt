using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using NUnit.Framework;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Services.Likes;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
    [TestFixture]
    public class LikesServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly ILikesService _likesService;

        public LikesServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _likesService = new LikesService(_context);
        }

        [SetUp]
        public void Setup()
        {
            _context.Users.RemoveRange(_context.Users);
            _context.People.RemoveRange(_context.People);
            _context.SaveChanges();
        }

        [TearDown]
        public void dispose()
        {
            _context.Users.RemoveRange(_context.Users);
            _context.People.RemoveRange(_context.People);
            _context.SaveChanges();
        }

        [Test]
        public async Task CanAddLikedPersonForUser(){
            var user = RandomDataGenerator.GenerateUser();
            var person = RandomDataGenerator.GeneratePerson();
            _context.Users.Add(user);
            _context.People.Add(person);
            await _context.SaveChangesAsync();

            var personToLike = new AddLikedPersonDto{
                PersonId = person.Id
            };

            await _likesService.AddLike(user.Id, personToLike);

            Assert.That(user.Likes.Count, Is.EqualTo(1));
        }

        [Test]
        public async Task CanGetIfUserHasLikedAPersonById(){
            var user = RandomDataGenerator.GenerateUser();
            var person = RandomDataGenerator.GeneratePerson();
            _context.Users.Add(user);
            _context.People.Add(person);
            user.Likes.Add(person);
            await _context.SaveChangesAsync();

            var hasLiked = await _likesService.CurrentUserLikesPersonWithId(person.Id, user.Id);
            Assert.IsTrue(hasLiked);
        }

        [Test]
        public async Task CanGetIfUserHasNotLikedAPersonById(){
            var user = RandomDataGenerator.GenerateUser();
            var person = RandomDataGenerator.GeneratePerson();
            var person2 = RandomDataGenerator.GeneratePerson();
            _context.Users.Add(user);
            _context.People.Add(person);
            _context.People.Add(person2);
            user.Likes.Add(person2);
            await _context.SaveChangesAsync();

            var hasLiked = await _likesService.CurrentUserLikesPersonWithId(person.Id, user.Id);
            Assert.IsFalse(hasLiked);
        }

        [Test]
        public async Task CanRemoveALike(){
            var user = RandomDataGenerator.GenerateUser();
            var person = RandomDataGenerator.GeneratePerson();
            _context.Users.Add(user);
            _context.People.Add(person);
            user.Likes.Add(person);
            await _context.SaveChangesAsync();

            Assert.That(user.Likes.Count, Is.EqualTo(1));

            await _likesService.RemoveLike(user.Id, person.Id);

            Assert.That(user.Likes.Count, Is.EqualTo(0));
        }
    }
}