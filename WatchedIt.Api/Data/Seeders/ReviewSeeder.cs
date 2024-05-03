using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

using WatchedIt.Api.Helpers;
using WatchedIt.Api.Models.ReviewModels;

namespace WatchedIt.Api.Data.Seeders
{
    class ReviewTestData : AddReviewDto{
        public int FilmId { get; set;}
        public int UserId { get; set;}
    }
    public class ReviewSeeder
    {
        private readonly WatchedItContext _context;
        private readonly IHostEnvironment _env;


        public ReviewSeeder(WatchedItContext context, IHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public void Seed()
        {
            if(!_context.Reviews.Any())
            {
                string data = FileHelper.GetJSONData(_env.ContentRootPath, "ReviewTestData.json");
                var reviews = JsonSerializer.Deserialize<List<ReviewTestData>>(data);

                foreach(var review in reviews)
                {
                    var r = new Review{
                        Film = _context.Films.FirstOrDefault(x => x.Id == review.FilmId),
                        User = _context.Users.FirstOrDefault(x => x.Id == review.UserId),
                        Rating = review.Rating,
                        Text = review.Text,
                        CreatedDate = DateTime.Now,
                        UpdatedDate = DateTime.Now

                    };
                    _context.Reviews.Add(r);
                }
                _context.SaveChanges();
            }
        }
    }
}