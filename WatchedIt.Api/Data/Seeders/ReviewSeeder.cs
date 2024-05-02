using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using WatchedIt.Api.Models.ReviewModels;

namespace WatchedIt.Api.Data.Seeders
{
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
                string data = GetData();
                var reviews = JsonSerializer.Deserialize<List<Dictionary<string,string>>>(data);

                foreach(var review in reviews)
                {
                    var r = new Review{
                        Film = _context.Films.FirstOrDefault(x => x.Id == int.Parse(review["FilmId"])),
                        User = _context.Users.FirstOrDefault(x => x.Id == int.Parse(review["UserId"])),
                        Rating = int.Parse(review["Rating"]),
                        Text = review["Text"],
                        CreatedDate = DateTime.Now,
                        UpdatedDate = DateTime.Now

                    };
                    _context.Reviews.Add(r);
                }
                _context.SaveChanges();
            }
        }

        private string GetData()
        {
            string rootPath = _env.ContentRootPath;
            string filePath = Path.GetFullPath(Path.Combine(rootPath, "Data/TestData", "ReviewTestData.json"));

            using (var r = new StreamReader(filePath))
            {
                string json = r.ReadToEnd();
                return json;
            }
        }
    }
}