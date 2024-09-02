using WatchedIt.Api.Models.NewsCategoryModels;

namespace WatchedIt.Api.Data.Seeders
{
    public class NewsCategorySeeder
    {
        private readonly WatchedItContext _context;

        public NewsCategorySeeder(WatchedItContext context)
        {
            _context = context;
        }

        public void Seed()
        {
            if(!_context.NewsCategories.Any())
            {
                var newsCategories = new List<NewsCategory>()
                {
                    new NewsCategory{
                        Id = 1,
                        Name = "Films"
                    },
                    new NewsCategory{
                        Id = 2,
                        Name = "People"
                    },
                    new NewsCategory{
                        Id = 3,
                        Name = "Community"
                    },
                    new NewsCategory{
                        Id = 4,
                        Name = "Meta"
                    },
                    new NewsCategory{
                        Id = 5,
                        Name = "New releases"
                    },
                    new NewsCategory{
                        Id = 6,
                        Name = "Events"
                    }
                };

                _context.Database.OpenConnection();
                try
                {
                    _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.NewsCategories ON");
                    _context.NewsCategories.AddRange(newsCategories);
                    _context.SaveChanges();
                    _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.NewsCategories OFF");
                }
                finally
                {
                    _context.Database.CloseConnection();
                }


            }
        }

    }
}