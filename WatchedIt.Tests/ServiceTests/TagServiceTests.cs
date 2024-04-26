using Data;

using WatchedIt.Api.Exceptions;
using WatchedIt.Api.Models.TagModels;
using WatchedIt.Api.Services.TagService;
using WatchedIt.Tests.ServiceTests.Helpers;
using WatchedIt.Api.Models.Enums;

namespace WatchedIt.Tests.ServiceTests
{
    [TestFixture]
    public class TagServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly ITagService _tagService;

        public TagServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _tagService = new TagService(_context);
        }

        [SetUp]
        public void Setup()
        {
            _context.Tags.RemoveRange(_context.Tags);
            _context.SaveChanges();
        }

        [TearDown]
        public void Dispose()
        {
            _context.Tags.RemoveRange(_context.Tags);
            _context.SaveChanges();
        }

        [Test]
        public void CanAddTag()
        {
            Assert.DoesNotThrowAsync(async () =>
            {
                var tag = new AddTagDto
                {
                    Name = "French",
                    Type = TagType.Language
                };

                await _tagService.Add(tag);
            });
        }

        [Test]
        public async Task CanGetExistingTag()
        {
            var tag = RandomDataGenerator.GenerateTag();
            await _context.Tags.AddAsync(tag);
            await _context.SaveChangesAsync();

            var tagFromDb = await _tagService.GetById(tag.Id);

            Assert.That(tagFromDb.Id, Is.EqualTo(tag.Id));
        }

        [Test]
        public async Task CanGetMultipleTags()
        {
            var tag = RandomDataGenerator.GenerateTag();
            var tag2 = RandomDataGenerator.GenerateTag();
            await _context.Tags.AddAsync(tag);
            await _context.Tags.AddAsync(tag2);
            await _context.SaveChangesAsync();

            var allTags = await _tagService.GetAll();
            Assert.That(allTags, Has.Count.EqualTo(2));

        }

        [Test]
        public async Task CanUpdateTag()
        {
            var tag = RandomDataGenerator.GenerateTag();
            tag.Name = "Spanush";
            await _context.Tags.AddAsync(tag);
            await _context.SaveChangesAsync();

            var newName = "Spanish";

            var updatedTag = new UpdateTagDto
            {
                Name = newName
            };

            await _tagService.Update(tag.Id, updatedTag);

            var fromDb = await _tagService.GetById(tag.Id);

            Assert.Multiple(() =>
            {
                Assert.That(fromDb.Id, Is.EqualTo(tag.Id));
                Assert.That(fromDb.Name, Is.EqualTo(newName));
            });
        }

        [Test]
        public async Task CanDeleteTag()
        {
            var tag = RandomDataGenerator.GenerateTag();
            await _context.Tags.AddAsync(tag);
            await _context.SaveChangesAsync();

            _tagService.Delete(tag.Id);

            Assert.ThrowsAsync<NotFoundException>(async () =>
            {
                await _tagService.GetById(tag.Id);
            });
        }
    }
}