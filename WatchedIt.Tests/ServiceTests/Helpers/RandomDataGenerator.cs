using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Models.ReviewModels;

namespace WatchedIt.Tests.ServiceTests.Helpers
{
    public static class RandomDataGenerator
    {
        public static User GenerateUser(){
            return new User{
                Email = Faker.Internet.Email(),
                Username = Faker.Internet.UserName()
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
                LastName = Faker.Name.Last()
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
    }
}