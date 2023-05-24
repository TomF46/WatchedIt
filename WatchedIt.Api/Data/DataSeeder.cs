using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.CategoryModels;
using WatchedIt.Api.Services.AuthenticationService;


namespace WatchedIt.Api.Data
{
    public class DataSeeder
    {
        private readonly WatchedItContext _context;
        public readonly IHostEnvironment _env;
        private readonly IConfiguration _config;
        private readonly IAuthenticationService _authenticationService;



        public DataSeeder(WatchedItContext context, IHostEnvironment env, IConfiguration config, IAuthenticationService authenticationService)
        {
            _context = context;
            _env = env;
            _config = config;
            _authenticationService = authenticationService;
        }

        public void Seed()
        {
            if(_env.IsDevelopment()) SeedAdmin();
            SeedCategories();
        }

        private void SeedAdmin()
        {
            if(!_context.Users.Any())
            {
                // TODO Make this info come from config
                var admin = new User
                {
                    Email = "admin@email.com",
                    Username = "Admin",
                    ImageUrl = _config["Images:Defaults:ProfileImage"],
                    Role = Models.Enums.Role.Administrator
                };
                _authenticationService.Create(admin, "SomePassword123!");
            }
        }

        private void SeedCategories()
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