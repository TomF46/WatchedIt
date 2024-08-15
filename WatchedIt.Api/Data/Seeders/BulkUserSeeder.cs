using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

using Microsoft.IdentityModel.Tokens;

using WatchedIt.Api.Helpers;

using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Services.AuthenticationService;

namespace WatchedIt.Api.Data.Seeders
{
    public class BulkUserSeeder
    {
        private readonly WatchedItContext _context;
        private readonly IConfiguration _config;
        private readonly IHostEnvironment _env;
        private readonly IAuthenticationService _authenticationService;

        public BulkUserSeeder(WatchedItContext context, IConfiguration config, IHostEnvironment env, IAuthenticationService authenticationService)
        {
            _context = context;
            _config = config;
            _env = env;
            _authenticationService = authenticationService;
        }


        public void Seed()
        {
            for (int i = 0; i < 100; i++)
            {
                var u = new User
                {
                    Username = "User" + i,
                    Email = "User" + i + "@email.com",
                    ImageUrl = _config["Images:Defaults:ProfileImage"],
                    Role = Models.Enums.Role.User,
                    Watched = GenerateRandomWatchedList(),
                    Likes = GenerateRandomLikedList()
                };
                _authenticationService.Create(u, _config["TestDefaultPassword"]);
            }
        }

        private ICollection<Film> GenerateRandomWatchedList()
        {
            var watchedIds = new List<int>();
            Random r = new Random();
            int rInt = r.Next(0, _context.Films.Count());
            watchedIds = _context.Films.OrderBy(x => Guid.NewGuid()).Select(x => x.Id).Take(rInt).ToList();
            return _context.Films.Where(x => watchedIds.Contains(x.Id)).ToList();
        }

        private ICollection<Person> GenerateRandomLikedList()
        {
            var likedUsers = new List<int>();
            Random r = new Random();
            int rInt = r.Next(0, _context.People.Count());
            likedUsers = _context.People.OrderBy(x => Guid.NewGuid()).Select(x => x.Id).Take(rInt).ToList();
            return _context.People.Where(x => likedUsers.Contains(x.Id)).ToList();
        }

    }
}

