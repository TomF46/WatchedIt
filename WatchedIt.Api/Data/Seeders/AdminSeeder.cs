using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Services.AuthenticationService;

namespace WatchedIt.Api.Data.Seeders
{
    public class AdminSeeder
    {
        private readonly WatchedItContext _context;
        private readonly IConfiguration _config;
        private readonly IAuthenticationService _authenticationService;

        public AdminSeeder(WatchedItContext context, IConfiguration config, IAuthenticationService authenticationService)
        {
            _context = context;
            _config = config;
            _authenticationService = authenticationService;
        }

        public void Seed()
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
    }
}