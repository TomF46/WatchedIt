using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Data.Seeders;
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
            var categorySeeder = new CategorySeeder(_context);
            categorySeeder.Seed();

            if(_env.IsDevelopment()){
                var adminSeeder = new AdminSeeder(_context, _config, _authenticationService);
                adminSeeder.Seed();

                var filmsSeeder = new FilmSeeder(_context, _env);
                filmsSeeder.Seed();

                var peopleSeeder = new PeopleSeeder(_context, _env);
                peopleSeeder.Seed();
            }
            
        }
    }
}