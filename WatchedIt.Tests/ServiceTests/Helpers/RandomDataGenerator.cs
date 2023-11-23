using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.CategoryModels;
using WatchedIt.Api.Models.CommentModels;
using WatchedIt.Api.Models.CreditModels;
using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.FilmListModels;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.FilmTrivia;
using WatchedIt.Api.Models.News;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Models.ReviewModels;

namespace WatchedIt.Tests.ServiceTests.Helpers
{
    public static class RandomDataGenerator
    {
        public static User GenerateUser(){
            return new User{
                Email = Faker.Internet.Email(),
                Username = Faker.Internet.UserName(),
                Role = Role.User
            };
        }

        public static User GenerateAdminUser(){
            return new User{
                Email = Faker.Internet.Email(),
                Username = Faker.Internet.UserName(),
                Role = Role.Administrator
            };
        }

        public static Film GenerateFilm(){
            return new Film{
                Name = Faker.Name.FullName(),
                ShortDescription = Faker.Lorem.Sentence(),
                FullDescription = Faker.Lorem.Paragraph(),
                Runtime = Faker.RandomNumber.Next(180),
                ReleaseDate = new DateTime().Date
            };
        }

        public static Person GeneratePerson(){
            return new Person{
                FirstName = Faker.Name.First(),
                LastName = Faker.Name.Last(),
                DateOfBirth = new DateTime().Date
            };
        }

        public static Review GenerateReview(){
            return new Review{
                Film = GenerateFilm(),
                User = GenerateUser(),
                Rating = Faker.RandomNumber.Next(10),
                Text = Faker.Lorem.Sentence()
            };
        }

        public static Review GenerateReview(Film film, User user){
            return new Review{
                Film = film,
                User = user,
                Rating = Faker.RandomNumber.Next(10),
                Text = Faker.Lorem.Sentence()
            };
        }

        public static Credit GenerateCredit(Person person, Film film){
            return new Credit{
                Person = person,
                Film = film,
                Role = Faker.Name.FullName(),
                Type = CreditType.Cast
            };
        }

        public static FilmList GenerateFilmList(User user){
            return new FilmList{
                Name = Faker.Name.First(),
                Description = Faker.Lorem.Sentence(),
                CreatedBy = user
            };
        }

        public static Category GenerateCategory(){
            return new Category{
                Name = Faker.Lorem.GetFirstWord(),
            };
        }

        public static ReviewComment GenerateReviewCommentForReview(Review review){
            return new ReviewComment{
                User = GenerateUser(),
                Text = Faker.Lorem.Sentence(),
                Review = review,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            };
        }

        public static FilmTrivia GenerateFilmTrivia(){
            return new FilmTrivia{
                Film = GenerateFilm(),
                User = GenerateUser(),
                Text = Faker.Lorem.Sentence()
            };
        }

        public static FilmTrivia GenerateFilmTrivia(Film film, User user){
            return new FilmTrivia{
                Film = film,
                User = user,
                Text = Faker.Lorem.Sentence()
            };
        }

        public static User GeneratePublisher(){
            return new User{
                Email = Faker.Internet.Email(),
                Username = Faker.Internet.UserName(),
                Role = Role.User,
                CanPublish = true
            };
        }

        public static NewsArticle GenerateNewsArticle(){
            return new NewsArticle{
                User = GeneratePublisher(),
                Title = Faker.Lorem.Sentence(),
                Content = Faker.Lorem.Paragraph(),
                Published = true,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            };
        }

        public static NewsArticle GenerateNewsArticle(User user){
            return new NewsArticle{
                User = user,
                Title = Faker.Lorem.Sentence(),
                Content = Faker.Lorem.Paragraph(),
                Published = true,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now
            };
        }

    }
}