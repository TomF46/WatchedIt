using Data;
using WatchedIt.Api.Exceptions;
using WatchedIt.Api.Models.CategoryModels;
using WatchedIt.Api.Services.CategoryService;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
    [TestFixture]
    public class CategoryServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly ICategoryService _categoryService;
        
        public CategoryServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _categoryService = new CategoryService(_context);
        }

        [SetUp]
        public void Setup()
        {
            _context.Categories.RemoveRange(_context.Categories);
            _context.SaveChanges();
        }

        [TearDown]
        public void Dispose()
        {
            _context.Categories.RemoveRange(_context.Categories);
            _context.SaveChanges();
        }

        [Test]
        public void CanAddCategory()
        {
            Assert.DoesNotThrowAsync(async () => {
                var category = new AddCategoryDto {
                    Name = "Horror"
                };

                await _categoryService.Add(category);
            });
        }

        [Test]
        public async Task CanGetExistingCategory()
        {
            var category = RandomDataGenerator.GenerateCategory();
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();

            var categoryFromDb = await _categoryService.GetById(category.Id);

            Assert.That(categoryFromDb.Id, Is.EqualTo(category.Id));
        }

        [Test]
        public async Task CanGetMultipleCategories()
        {
            var category = RandomDataGenerator.GenerateCategory();
            var category2 = RandomDataGenerator.GenerateCategory();
            await _context.Categories.AddAsync(category);
            await _context.Categories.AddAsync(category2);
            await _context.SaveChangesAsync();

            var allCategories = await _categoryService.GetAll();
            Assert.That(allCategories, Has.Count.EqualTo(2));
            
        }

        [Test]
        public async Task CanUpdateCategory()
        {
            var category = RandomDataGenerator.GenerateCategory();
            category.Name = "Horror";
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();

            var newName = "Drama";

            var updatedCategory = new UpdateCategoryDto {
                Name = newName
            };

            await _categoryService.Update(category.Id, updatedCategory);

            var fromDb = await _categoryService.GetById(category.Id);

            Assert.Multiple(() =>
            {
                Assert.That(fromDb.Id, Is.EqualTo(category.Id));
                Assert.That(fromDb.Name, Is.EqualTo(newName));
            });
        }

        [Test]
        public async Task CanDeleteCategory()
        {
            var category = RandomDataGenerator.GenerateCategory();
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();

            _categoryService.Delete(category.Id);

            Assert.ThrowsAsync<NotFoundException>(async () => {
                await _categoryService.GetById(category.Id);
            });
        }
    }
}