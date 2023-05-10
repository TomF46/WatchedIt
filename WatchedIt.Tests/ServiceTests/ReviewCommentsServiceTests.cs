using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using NUnit.Framework;
using WatchedIt.Api.Models;
using WatchedIt.Api.Models.CommentModels;
using WatchedIt.Api.Services.NotificationService;
using WatchedIt.Api.Services.ReviewCommentsService;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
    public class ReviewCommentsServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly IReviewCommentsService _reviewCommentsService;

        public ReviewCommentsServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            var notificationService = new NotificationService(_context);
            _reviewCommentsService = new ReviewCommentsService(_context, notificationService);
        }

        [SetUp]
        public void Setup()
        {
            _context.Films.RemoveRange(_context.Films);
            _context.Users.RemoveRange(_context.Users);
            _context.Reviews.RemoveRange(_context.Reviews);
            _context.ReviewComments.RemoveRange(_context.ReviewComments);
            _context.SaveChanges();
        }

        [TearDown]
        public void dispose()
        {
            _context.Films.RemoveRange(_context.Films);
            _context.Users.RemoveRange(_context.Users);
            _context.Reviews.RemoveRange(_context.Reviews);
            _context.ReviewComments.RemoveRange(_context.ReviewComments);
            _context.SaveChanges();
        }

        [Test]
        public async Task CanAddReviewComment()
        {
            var user = RandomDataGenerator.GenerateUser();
            var review = RandomDataGenerator.GenerateReview();
            _context.Users.Add(user);
            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            Assert.DoesNotThrowAsync(async () => {
                var comment = new AddCommentDto{
                    Text = "Some random text"
                };
                await _reviewCommentsService.Add(review.Id, user.Id, comment);
            });
        }

        [Test]
        public async Task CanGetCommentForReview()
        {
            var review = RandomDataGenerator.GenerateReview();
            var comment1 = RandomDataGenerator.GenerateReviewCommentForReview(review);
            var comment2 = RandomDataGenerator.GenerateReviewCommentForReview(review);
            var comment3 = RandomDataGenerator.GenerateReviewCommentForReview(review);
            _context.Reviews.Add(review);
            _context.ReviewComments.Add(comment1);
            _context.ReviewComments.Add(comment2);
            _context.ReviewComments.Add(comment3);
            await _context.SaveChangesAsync();

            var pagination = new PaginationParameters{
                PageNumber = 1,
                PageSize = 20
            };

            var comments = await _reviewCommentsService.GetCommentsForReview(review.Id, pagination);

            Assert.That(comments.Data.Count(), Is.EqualTo(3));
        }

        [Test]
        public async Task CanDeleteComment()
        {
            var review = RandomDataGenerator.GenerateReview();
            var comment = RandomDataGenerator.GenerateReviewCommentForReview(review);
            _context.Reviews.Add(review);
            _context.ReviewComments.Add(comment);
            await _context.SaveChangesAsync();

            Assert.That(review.Comments.Count, Is.EqualTo(1));

            _reviewCommentsService.Delete(comment.Id, comment.User.Id);
            var pagination = new PaginationParameters{
                PageNumber = 1,
                PageSize = 20
            };
            var comments = await _reviewCommentsService.GetCommentsForReview(review.Id, pagination);
            Assert.That(comments.Data.Count(), Is.EqualTo(0));
        }

        [Test]
        public async Task CanUpdateComment()
        {
            var initialText = "Some random string";
            var review = RandomDataGenerator.GenerateReview();
            var comment = RandomDataGenerator.GenerateReviewCommentForReview(review);
            comment.Text = initialText;
            _context.Reviews.Add(review);
            _context.ReviewComments.Add(comment);
            await _context.SaveChangesAsync();

            Assert.That(comment.Text, Is.EqualTo(initialText));

            var updatedString = "A different string";
            var updateComment = new UpdateCommentDto {
                Text = updatedString
            };

            await _reviewCommentsService.Update(comment.Id, comment.User.Id, updateComment);
            Assert.That(comment.Text, Is.EqualTo(updatedString));
            
        }
    }
}