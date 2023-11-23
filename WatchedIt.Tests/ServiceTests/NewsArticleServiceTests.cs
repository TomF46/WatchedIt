using Data;
using WatchedIt.Api.Exceptions;
using WatchedIt.Api.Models;
using WatchedIt.Api.Models.News;
using WatchedIt.Api.Services.NewsArticleService;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
    [TestFixture]
    public class NewsArticleServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly INewsArticleService _newsArticleService;

        public NewsArticleServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _newsArticleService = new NewsArticleService(_context);
        }
        
        [SetUp]
        public void Setup()
        {
            _context.Users.RemoveRange(_context.Users);
            _context.NewsArticles.RemoveRange(_context.NewsArticles);
            _context.SaveChanges();
        }

        [TearDown]
        public void Dispose()
        {
            _context.Users.RemoveRange(_context.Users);
            _context.NewsArticles.RemoveRange(_context.NewsArticles);
            _context.SaveChanges();
        }

        [Test]
        public async Task CanAddArticle(){
            var user = RandomDataGenerator.GeneratePublisher();
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            Assert.DoesNotThrowAsync(async () => {
                var article = new AddNewsArticleDto{
                    Title = "Test article",
                    Content = "Some test content",
                    Publish = true
                };

                await _newsArticleService.Add(user.Id, article);
            });
        }

        [Test]
        public async Task CantAddArticleWithoutPublishRights(){
            var user = RandomDataGenerator.GenerateUser();
            user.CanPublish = false;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            Assert.ThrowsAsync<Api.Exceptions.UnauthorizedAccessException>(async () => {
                var article = new AddNewsArticleDto{
                    Title = "Test article",
                    Content = "Some test content",
                    Publish = true
                };

                await _newsArticleService.Add(user.Id, article);
            });
        }

        [Test]
        public async Task CanGetSingleNewsArticle(){
            var article = RandomDataGenerator.GenerateNewsArticle();
            await _context.NewsArticles.AddAsync(article);
            await _context.SaveChangesAsync();

            var articleFromDb = await _newsArticleService.GetById(article.Id);
            Assert.That(articleFromDb.Id, Is.EqualTo(article.Id));
        }

        [Test]
        public async Task CanGetMultipleNewsArticles(){
            var article = RandomDataGenerator.GenerateNewsArticle();
            var article2 = RandomDataGenerator.GenerateNewsArticle();
            var article3 = RandomDataGenerator.GenerateNewsArticle();
            await _context.NewsArticles.AddAsync(article);
            await _context.NewsArticles.AddAsync(article2);
            await _context.NewsArticles.AddAsync(article3);
            await _context.SaveChangesAsync();

            var pagination = new PaginationParameters{
                PageNumber = 1,
                PageSize = 20
            };

            var articles = await _newsArticleService.GetAll(pagination);
            Assert.That(articles.Data, Has.Count.EqualTo(3));
        }

        [Test]
        public async Task CanUpdateArticle(){
            var user = RandomDataGenerator.GeneratePublisher();
            var article = RandomDataGenerator.GenerateNewsArticle(user);
            await _context.Users.AddAsync(user);
            await _context.NewsArticles.AddAsync(article);
            await _context.SaveChangesAsync();

            var newTitle = "A new title";

            var updatedArticle = new UpdateNewsArticleDto{
                Title = newTitle,
                Content = article.Content,
                Publish = article.Published
            };

            await _newsArticleService.Update(article.Id, user.Id, updatedArticle);

            var articleFromDb = await _newsArticleService.GetById(article.Id);
            Assert.That(articleFromDb.Title, Is.EqualTo(newTitle));
        }

        [Test]
        public async Task CantUpdateArticleUserDoesntOwn(){
            var user = RandomDataGenerator.GeneratePublisher();
            var user2 = RandomDataGenerator.GeneratePublisher();
            var article = RandomDataGenerator.GenerateNewsArticle(user);
            await _context.Users.AddAsync(user);
            await _context.Users.AddAsync(user2);
            await _context.NewsArticles.AddAsync(article);
            await _context.SaveChangesAsync();

            var newTitle = "A new title";

            var updatedArticle = new UpdateNewsArticleDto{
                Title = newTitle,
                Content = article.Content,
                Publish = article.Published
            };

            Assert.ThrowsAsync<Api.Exceptions.UnauthorizedAccessException>(async () => {
                await _newsArticleService.Update(article.Id, user2.Id, updatedArticle);
            });
        }

        [Test]
        public async Task UserCanPublishUnpublishedArticle(){
            var user = RandomDataGenerator.GeneratePublisher();
            var article = RandomDataGenerator.GenerateNewsArticle(user);
            article.Published = false;
            await _context.Users.AddAsync(user);
            await _context.NewsArticles.AddAsync(article);
            await _context.SaveChangesAsync();

            var updatedArticle = await _newsArticleService.SetArticlePublished(article.Id, user.Id, true);
            Assert.That(updatedArticle.Published, Is.EqualTo(true));
        }

        [Test]
        public async Task UserCantPublishUnpublishedArticleTheyDontOwn(){
            var user = RandomDataGenerator.GeneratePublisher();
            var user2 = RandomDataGenerator.GeneratePublisher();
            var article = RandomDataGenerator.GenerateNewsArticle(user);
            article.Published = false;
            await _context.Users.AddAsync(user);
            await _context.Users.AddAsync(user2);
            await _context.NewsArticles.AddAsync(article);
            await _context.SaveChangesAsync();

            Assert.ThrowsAsync<Api.Exceptions.UnauthorizedAccessException>(async () => {
                await _newsArticleService.SetArticlePublished(article.Id, user2.Id, true);
            });
        }

        [Test]
        public async Task UserCanUnPublishPublishedArticle(){
            var user = RandomDataGenerator.GeneratePublisher();
            var article = RandomDataGenerator.GenerateNewsArticle(user);
            article.Published = true;
            await _context.Users.AddAsync(user);
            await _context.NewsArticles.AddAsync(article);
            await _context.SaveChangesAsync();

            var updatedArticle = await _newsArticleService.SetArticlePublished(article.Id, user.Id, false);
            Assert.That(updatedArticle.Published, Is.EqualTo(false));
        }

        [Test]
        public async Task UserCantUnpublishPublishedArticleTheyDontOwn(){
            var user = RandomDataGenerator.GeneratePublisher();
            var user2 = RandomDataGenerator.GeneratePublisher();
            var article = RandomDataGenerator.GenerateNewsArticle(user);
            article.Published = true;
            await _context.Users.AddAsync(user);
            await _context.Users.AddAsync(user2);
            await _context.NewsArticles.AddAsync(article);
            await _context.SaveChangesAsync();

            Assert.ThrowsAsync<Api.Exceptions.UnauthorizedAccessException>(async () => {
                await _newsArticleService.SetArticlePublished(article.Id, user2.Id, false);
            });
        }

    }
}