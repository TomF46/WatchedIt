// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Data;
// using NUnit.Framework;
// using WatchedIt.Api.Models.Authentication;
// using WatchedIt.Api.Models.FilmModels;
// using WatchedIt.Api.Models.ReviewModels;
// using WatchedIt.Api.Services.ReviewService;
// using WatchedIt.Tests.ServiceTests.Helpers;

// namespace WatchedIt.Tests.ServiceTests
// {
//     [TestFixture]
//     public class ReviewServiceTests
//     {
//         private readonly WatchedItContext _context;
//         private readonly IReviewService _reviewService;

//         public ReviewServiceTests()
//         {
//             _context = new InMemoryDbContextFactory().GetDBContext();
//             _reviewService = new ReviewService(_context);
//         }
        
//         [SetUp]
//         public void Setup()
//         {
//             _context.Reviews.RemoveRange(_context.Reviews);
//             _context.Films.RemoveRange(_context.Films);
//             _context.People.RemoveRange(_context.People);
//             _context.SaveChanges();
//         }

//         [TearDown]
//         public void dispose()
//         {
//             _context.Reviews.RemoveRange(_context.Reviews);
//             _context.Films.RemoveRange(_context.Films);
//             _context.People.RemoveRange(_context.People);
//             _context.SaveChanges();
//         }

//         [Test]
//         public async Task CanAddReview(){
//             var user = RandomDataGenerator.GenerateUser();
//             var film = RandomDataGenerator.GenerateFilm();

//             await _context.Films.AddAsync(film);
//             await _context.Users.AddAsync(user);
//             await _context.SaveChangesAsync();

//             Assert.DoesNotThrow(() => {
//                 var review = new AddReviewDto{
//                     Rating = 5,
//                     Text = "It was good."
//                 };

//                 _reviewService.Add(film.Id,user.Id, review);
//             });
//         }

//         [Test]
//         public async Task canGetSingleReview(){
//             var review = RandomDataGenerator.GenerateReview();
//             var user = RandomDataGenerator.GenerateUser();
//             await _context.Reviews.AddAsync(review);
//             await _context.Users.AddAsync(user);
//             await _context.SaveChangesAsync();

//             var reviewFromDb = _reviewService.GetById(review.Id, user.Id);
//             Assert.That(reviewFromDb.Id, Is.EqualTo(review.Id)); 
//         }
//     }
// }