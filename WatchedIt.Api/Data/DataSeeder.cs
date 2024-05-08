using WatchedIt.Api.Data.Seeders;
using WatchedIt.Api.Services.AuthenticationService;


namespace WatchedIt.Api.Data
{
    public class DataSeeder
    {
        private readonly WatchedItContext _context;
        private readonly IHostEnvironment _env;
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

            var tagSeeder = new TagSeeder(_context);
            tagSeeder.Seed();

            if (_env.IsDevelopment())
            {
                var adminSeeder = new AdminSeeder(_context, _config, _authenticationService);
                adminSeeder.Seed();

                var peopleSeeder = new PeopleSeeder(_context, _env);
                peopleSeeder.Seed();

                var filmsSeeder = new FilmSeeder(_context, _env);
                filmsSeeder.Seed();

                var userSeeder = new UserSeeder(_context, _config, _env ,_authenticationService);
                userSeeder.Seed();

                var castCreditSeeder = new CastCreditSeeder(_context, _env);
                castCreditSeeder.SeedCastCredits();
                castCreditSeeder.SeedCrewCredits();

                var reviewSeeder = new ReviewSeeder(_context, _env);
                reviewSeeder.Seed();

                var filmListSeeder = new FilmListSeeder(_context, _env);
                filmListSeeder.Seed();

                var newsArticleSeeder = new NewsArticleSeeder(_context, _env);
                newsArticleSeeder.Seed();
            }

        }
    }
}