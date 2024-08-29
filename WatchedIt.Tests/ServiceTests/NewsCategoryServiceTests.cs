using Data;
using WatchedIt.Api.Exceptions;
using WatchedIt.Api.Models.NewsCategoryModels;
using WatchedIt.Api.Services.NewsCategoryService;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
    [TestFixture]
    public class NewsCategoryServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly INewsCategoryService _NewsCategoryService;
        
        public NewsCategoryServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _NewsCategoryService = new NewsCategoryService(_context);
        }

        [SetUp]
        public void Setup()
        {
            _context.NewsCategories.RemoveRange(_context.NewsCategories);
            _context.SaveChanges();
        }

        [TearDown]
        public void Dispose()
        {
            _context.NewsCategories.RemoveRange(_context.NewsCategories);
            _context.SaveChanges();
        }

        [Test]
        public void CanAddNewsCategory()
        {
            Assert.DoesNotThrowAsync(async () => {
                var NewsCategory = new AddNewsCategoryDto {
                    Name = "Gossip"
                };

                await _NewsCategoryService.Add(NewsCategory);
            });
        }

        [Test]
        public async Task CanGetExistingNewsCategory()
        {
            var NewsCategory = RandomDataGenerator.GenerateNewsCategory();
            await _context.NewsCategories.AddAsync(NewsCategory);
            await _context.SaveChangesAsync();

            var NewsCategoryFromDb = await _NewsCategoryService.GetById(NewsCategory.Id);

            Assert.That(NewsCategoryFromDb.Id, Is.EqualTo(NewsCategory.Id));
        }

        [Test]
        public async Task CanGetMultipleNewsCategories()
        {
            var NewsCategory = RandomDataGenerator.GenerateNewsCategory();
            var NewsCategory2 = RandomDataGenerator.GenerateNewsCategory();
            await _context.NewsCategories.AddAsync(NewsCategory);
            await _context.NewsCategories.AddAsync(NewsCategory2);
            await _context.SaveChangesAsync();

            var allNewsCategories = await _NewsCategoryService.GetAll();
            Assert.That(allNewsCategories, Has.Count.EqualTo(2));
            
        }

        [Test]
        public async Task CanUpdateNewsCategory()
        {
            var NewsCategory = RandomDataGenerator.GenerateNewsCategory();
            NewsCategory.Name = "Goship";
            await _context.NewsCategories.AddAsync(NewsCategory);
            await _context.SaveChangesAsync();

            var newName = "Gossip";

            var updatedNewsCategory = new UpdateNewsCategoryDto {
                Name = newName
            };

            await _NewsCategoryService.Update(NewsCategory.Id, updatedNewsCategory);

            var fromDb = await _NewsCategoryService.GetById(NewsCategory.Id);

            Assert.Multiple(() =>
            {
                Assert.That(fromDb.Id, Is.EqualTo(NewsCategory.Id));
                Assert.That(fromDb.Name, Is.EqualTo(newName));
            });
        }

        [Test]
        public async Task CanDeleteNewsCategory()
        {
            var NewsCategory = RandomDataGenerator.GenerateNewsCategory();
            await _context.NewsCategories.AddAsync(NewsCategory);
            await _context.SaveChangesAsync();

            _NewsCategoryService.Delete(NewsCategory.Id);

            Assert.ThrowsAsync<NotFoundException>(async () => {
                await _NewsCategoryService.GetById(NewsCategory.Id);
            });
        }
    }
}