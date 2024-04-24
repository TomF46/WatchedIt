using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Data;

using WatchedIt.Api.Models;
using WatchedIt.Api.Models.Files;
using WatchedIt.Api.Services.PersonImageService;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
    [TestFixture]
    public class PersonImageServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly IPersonImageService _personImageService;
        public PersonImageServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _personImageService = new PersonImageService(_context);
        }

        [SetUp]
        public void Setup()
        {
            _context.People.RemoveRange(_context.People);
            _context.Users.RemoveRange(_context.Users);
            _context.PersonImages.RemoveRange(_context.PersonImages);
            _context.SaveChanges();
        }

        [TearDown]
        public void Dispose()
        {
            _context.People.RemoveRange(_context.People);
            _context.Users.RemoveRange(_context.Users);
            _context.PersonImages.RemoveRange(_context.PersonImages);
            _context.SaveChanges();
        }

        [Test]
        public async Task CanAddPersonImage()
        {
            var person = RandomDataGenerator.GeneratePerson();
            await _context.People.AddAsync(person);
            await _context.SaveChangesAsync();

            Assert.DoesNotThrowAsync(async () =>
            {
                var personImage = new AddImageDto
                {
                    Url = "someUrl."
                };

                await _personImageService.Add(person.Id, personImage);
            });
        }

        [Test]
        public async Task CanGetAllImagesForPerson()
        {
            var person = RandomDataGenerator.GeneratePerson();
            var image1 = RandomDataGenerator.GeneratePersonImage();
            var image2 = RandomDataGenerator.GeneratePersonImage();
            var image3 = RandomDataGenerator.GeneratePersonImage();
            person.Images.Add(image1);
            person.Images.Add(image2);
            person.Images.Add(image3);
            await _context.People.AddAsync(person);
            await _context.SaveChangesAsync();

            var pagination = new PaginationParameters
            {
                PageNumber = 1,
                PageSize = 20
            };

            var personImages = await _personImageService.GetImages(person.Id, pagination);
            Assert.That(personImages.Of, Is.EqualTo(3));
        }

        [Test]
        public async Task CanAddPersonImageAndGet()
        {
            var person = RandomDataGenerator.GeneratePerson();
            await _context.People.AddAsync(person);
            await _context.SaveChangesAsync();

            var personImage = new AddImageDto
            {
                Url = "someUrl."
            };

            await _personImageService.Add(person.Id, personImage);

            var pagination = new PaginationParameters
            {
                PageNumber = 1,
                PageSize = 20
            };

            var personImages = await _personImageService.GetImages(person.Id, pagination);
            Assert.That(personImages.Of, Is.EqualTo(1));
        }

        [Test]
        public async Task CanDeletePersonImage()
        {
            var person = RandomDataGenerator.GeneratePerson();
            var image1 = RandomDataGenerator.GeneratePersonImage();
            person.Images.Add(image1);
            await _context.People.AddAsync(person);
            await _context.SaveChangesAsync();

            _personImageService.Delete(image1.Id);

            var pagination = new PaginationParameters
            {
                PageNumber = 1,
                PageSize = 20
            };

            var personImages = await _personImageService.GetImages(person.Id, pagination);
            Assert.That(personImages.Of, Is.EqualTo(0));

        }

        [Test]
        public async Task CanGetAllImagesForPersonWithNoImages()
        {
            var person = RandomDataGenerator.GeneratePerson();
            await _context.People.AddAsync(person);
            await _context.SaveChangesAsync();

            var pagination = new PaginationParameters
            {
                PageNumber = 1,
                PageSize = 20
            };

            var personImages = await _personImageService.GetImages(person.Id, pagination);
            Assert.That(personImages.Of, Is.EqualTo(0));
        }

    }
}