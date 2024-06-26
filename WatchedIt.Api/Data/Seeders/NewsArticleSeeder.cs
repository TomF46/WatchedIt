using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

using WatchedIt.Api.Helpers;
using WatchedIt.Api.Models.News;

namespace WatchedIt.Api.Data.Seeders
{
    class NewsArticleTestData : AddNewsArticleDto{
        public int UserId { get; set;}
    }
    public class NewsArticleSeeder
    {
        private readonly WatchedItContext _context;
        private readonly IHostEnvironment _env;


        public NewsArticleSeeder(WatchedItContext context, IHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public void Seed()
        {
            if(!_context.NewsArticles.Any())
            {
                string data = FileHelper.GetJSONData(_env.ContentRootPath, "NewsArticleTestData.json");
                var newsArticles = JsonSerializer.Deserialize<List<NewsArticleTestData>>(data);

                foreach(var article in newsArticles)
                {
                    var a = new NewsArticle{
                        User = _context.Users.FirstOrDefault(x => x.Id == article.UserId),
                        Title = article.Title,
                        Content = article.Content,
                        ThumbnailUrl = article.ThumbnailUrl,
                        Published = article.Published,
                        CreatedDate = DateTime.Now,
                        UpdatedDate = DateTime.Now
                    };
                    _context.NewsArticles.Add(a);
                }
                _context.SaveChanges();
            }
        }
    }
}