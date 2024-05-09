using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.CategoryModels;

namespace WatchedIt.Api.Data.Seeders
{
    public class CategorySeeder
    {
        private readonly WatchedItContext _context;

        public CategorySeeder(WatchedItContext context)
        {
            _context = context;
        }

        public void Seed()
        {
            if (!_context.Categories.Any())
            {
                var categories = new List<Category>()
                {
                    new Category{
                        Id = 1,
                        Name = "Action"
                    },
                    new Category{
                        Id = 2,
                        Name = "Horror"
                    },
                    new Category{
                        Id = 3,
                        Name = "Drama"
                    },
                    new Category{
                        Id = 4,
                        Name = "Thriller"
                    },
                    new Category{  
                        Id = 5,
                        Name = "Animation",
                    },
                    new Category{
                        Id = 6,
                        Name = "Comedy"
                    },
                    new Category{
                        Id = 7,
                        Name = "Musical"
                    },
                    new Category{
                        Id = 8,
                        Name = "Crime"
                    },
                    new Category{
                        Id = 9,
                        Name = "Romance"
                    },
                    new Category{
                        Id = 10,
                        Name = "Epic"
                    },
                    new Category{
                        Id = 11,
                        Name = "Science fiction"
                    },
                    new Category{
                        Id = 12,
                        Name = "Western"
                    },
                    new Category{
                        Id = 13,
                        Name = "Documentary"
                    },
                    new Category{
                        Id = 14,
                        Name = "Adventure"
                    },
                    new Category{
                        Id = 15,
                        Name = "War"
                    },
                    new Category{
                        Id = 16,
                        Name = "Mystery"
                    },
                    new Category{
                        Id = 17,
                        Name = "Family"
                    },
                    new Category{
                        Id = 18,
                        Name = "Biography"
                    },
                    new Category{
                        Id = 19,
                        Name = "Fantasy"
                    },
                    new Category{
                        Id = 20,
                        Name = "Historical"
                    }
                };
                

                _context.Database.OpenConnection();
                try
                {
                    _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Categories ON");
                    _context.Categories.AddRange(categories);
                    _context.SaveChanges();
                    _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Categories OFF");
                }
                finally
                {
                    _context.Database.CloseConnection();
                }
            }
        }
    }
}