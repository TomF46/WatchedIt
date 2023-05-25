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
                        Name = "Action"
                    },
                    new Category{
                        Name = "Horror"
                    },
                    new Category{
                        Name = "Drama"
                    },
                    new Category{
                        Name = "Thriller"
                    },
                    new Category{  
                        Name = "Animation",
                    },
                    new Category{
                        Name = "Comedy"
                    },
                    new Category{
                        Name = "Musical"
                    },
                    new Category{
                        Name = "Crime"
                    },
                    new Category{
                        Name = "Romance"
                    },
                    new Category{
                        Name = "Epic"
                    },
                    new Category{
                        Name = "Science fiction"
                    },
                    new Category{
                        Name = "Western"
                    },
                    new Category{
                        Name = "Documentary"
                    }
                };

                _context.Categories.AddRange(categories);
                _context.SaveChanges();
            }
        }
    }
}