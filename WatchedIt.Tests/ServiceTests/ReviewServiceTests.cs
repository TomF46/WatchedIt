using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using NUnit.Framework;
using WatchedIt.Api.Exceptions;
using WatchedIt.Api.Models;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.ReviewModels;
using WatchedIt.Api.Services.ReviewService;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
    [TestFixture]
    public class ReviewServiceTests
    {
        private readonly WatchedItContext _context;
        private readonly IReviewService _reviewService;

        public ReviewServiceTests()
        {
            _context = new InMemoryDbContextFactory().GetDBContext();
            _reviewService = new ReviewService(_context);
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
        public async Task CanAddReview(){
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();

            await _context.Films.AddAsync(film);
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            Assert.DoesNotThrowAsync(async () => {
                var review = new AddReviewDto{
                    Rating = 5,
                    Text = "It was good."
                };

                await _reviewService.Add(film.Id,user.Id, review);
            });
        }

        [Test]
        public async Task canGetSingleReview(){
            var review = RandomDataGenerator.GenerateReview();
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();

            var reviewFromDb = await _reviewService.GetById(review.Id);
            Assert.That(reviewFromDb.Id, Is.EqualTo(review.Id)); 
        }

        [Test]
        public async Task canGetAllReviewsForFilm(){
            var user1 = RandomDataGenerator.GenerateUser();
            var user2 = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            var film2 = RandomDataGenerator.GenerateFilm();
            var review1 = RandomDataGenerator.GenerateReview(film, user1);
            var review2 = RandomDataGenerator.GenerateReview(film2, user1);
            var review3 = RandomDataGenerator.GenerateReview(film, user2);

            await _context.Films.AddAsync(film);
            await _context.Films.AddAsync(film2);
            await _context.Users.AddAsync(user1);
            await _context.Users.AddAsync(user2);
            await _context.Reviews.AddAsync(review1);
            await _context.Reviews.AddAsync(review2);
            await _context.Reviews.AddAsync(review3);
            await _context.SaveChangesAsync();

            var pagination = new PaginationParameters{
                PageNumber = 1,
                PageSize = 20
            };

            var reviews = await _reviewService.GetAllForFilm(film.Id, pagination);
            Assert.That(reviews.Data.Count, Is.EqualTo(2));
        }

        [Test]
        public async Task canGetAllReviewsFromUser(){
            var user1 = RandomDataGenerator.GenerateUser();
            var user2 = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            var film2 = RandomDataGenerator.GenerateFilm();
            var review1 = RandomDataGenerator.GenerateReview(film, user1);
            var review2 = RandomDataGenerator.GenerateReview(film2, user1);
            var review3 = RandomDataGenerator.GenerateReview(film, user2);

            await _context.Films.AddAsync(film);
            await _context.Films.AddAsync(film2);
            await _context.Users.AddAsync(user1);
            await _context.Users.AddAsync(user2);
            await _context.Reviews.AddAsync(review1);
            await _context.Reviews.AddAsync(review2);
            await _context.Reviews.AddAsync(review3);
            await _context.SaveChangesAsync();

            var pagination = new PaginationParameters{
                PageNumber = 1,
                PageSize = 20
            };

            var reviews = await _reviewService.GetAllByUser(user2.Id, pagination);
            Assert.That(reviews.Data.Count, Is.EqualTo(1));
        }

        [Test]
        public async Task canUpdateReview(){
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            var review = RandomDataGenerator.GenerateReview(film, user);
            review.Rating = 9;
            review.Text = "Great film";

            await _context.Films.AddAsync(film);
            await _context.Users.AddAsync(user);
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();

            var newRating = 2;
            var newText = "Bad film";

            var updatedReview = new UpdateReviewDto{
                Rating = newRating,
                Text = newText
            };

            await _reviewService.Update(review.Id, user.Id, updatedReview);
            
            var reviewFromDb = await _reviewService.GetById(review.Id);

            Assert.That(reviewFromDb.Rating, Is.EqualTo(newRating));
            Assert.That(reviewFromDb.Text, Is.EqualTo(newText));
        }

        [Test]
        public async Task CanDeleteReview(){
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            var review = RandomDataGenerator.GenerateReview(film, user);
            await _context.Films.AddAsync(film);
            await _context.Users.AddAsync(user);
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();

            _reviewService.Delete(review.Id, user.Id);

            Assert.ThrowsAsync<NotFoundException>(async () =>
            {
                await _reviewService.GetById(review.Id);
            });
        }

        [Test]
        public async Task canUpdateAverageReviewScoreOfFilm(){
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();
            var review = RandomDataGenerator.GenerateReview(film, user);
            var review2 = RandomDataGenerator.GenerateReview(film, user);
            var review3 = RandomDataGenerator.GenerateReview(film, user);
            review.Rating = 6;
            review2.Rating = 8;
            review3.Rating = 10;
            await _context.Films.AddAsync(film);
            await _context.Users.AddAsync(user);
            await _context.Reviews.AddAsync(review);
            await _context.Reviews.AddAsync(review2);
            await _context.Reviews.AddAsync(review3);

            _reviewService.UpdateAverageScore(film);

            Assert.That(film.AverageRating, Is.EqualTo(8));



        }
    }
}