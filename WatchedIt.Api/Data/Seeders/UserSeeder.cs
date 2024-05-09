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
    public class UserSeeder
    {
        private readonly WatchedItContext _context;
        private readonly IConfiguration _config;
        private readonly IHostEnvironment _env;
        private readonly IAuthenticationService _authenticationService;

        public UserSeeder(WatchedItContext context, IConfiguration config, IHostEnvironment env, IAuthenticationService authenticationService)
        {
            _context = context;
            _config = config;
            _env = env;
            _authenticationService = authenticationService;
        }


        public void Seed()
        {
            if(!_context.Users.Where(x => x.Role == Models.Enums.Role.User).Any())
            {
                string data = FileHelper.GetJSONData(_env.ContentRootPath, "UserTestData.json");
                var users = JsonSerializer.Deserialize<List<User>>(data);

                foreach(var user in users)
                {
                    var u = new User{
                        Id = user.Id,
                        Username = user.Username,
                        Email = user.Email,
                        ImageUrl = user.ImageUrl.IsNullOrEmpty() ?  _config["Images:Defaults:ProfileImage"] : user.ImageUrl,
                        Role = Models.Enums.Role.User,
                        Watched = GenerateRandomWatchedList(),
                        Likes = GenerateRandomLikedList()
                    };

                    _context.Database.OpenConnection();
                    try
                    {
                        _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Users ON");
                        _authenticationService.Create(u, _config["TestDefaultPassword"]);
                        _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Users OFF");
                    }
                    finally
                    {
                        _context.Database.CloseConnection();
                    }
                }
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

