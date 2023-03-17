using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data;
using NUnit.Framework;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.ReviewModels;
using WatchedIt.Api.Services.ReviewService;
using WatchedIt.Tests.ServiceTests.Helpers;

namespace WatchedIt.Tests.ServiceTests
{
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
            _context.Reviews.RemoveRange(_context.Reviews);
            _context.SaveChanges();
        }

        [TearDown]
        public void dispose()
        {
            _context.Reviews.RemoveRange(_context.Reviews);
            _context.SaveChanges();
        }

        [Test]
        public async Task CanAddReview(){
            var user = RandomDataGenerator.GenerateUser();
            var film = RandomDataGenerator.GenerateFilm();

            await _context.Films.AddAsync(film);
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            Assert.DoesNotThrow(() => {
                var review = new AddReviewDto{
                    FilmId = film.Id,
                    Rating = 5,
                    Text = "It was good."
                };

                _reviewService.Add(user.Id, review);
            });
        }

        [Test]
        public async Task canGetSingleReview(){
            var review = RandomDataGenerator.GenerateReview();
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();

            var reviewFromDb = _reviewService.GetById(review.Id);
            Assert.That(reviewFromDb.Id, Is.EqualTo(review.Id)); 
        }
    }
}