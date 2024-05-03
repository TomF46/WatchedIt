using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

using Microsoft.IdentityModel.Tokens;

using WatchedIt.Api.Helpers;

using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Services.AuthenticationService;

namespace WatchedIt.Api.Data.Seeders
{
    class UserTestData: User{
        public new IList<int> Watched { get; set; } = new List<int>();
        public new IList<int> Likes { get; set; } = new List<int>();
    }
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
                var users = JsonSerializer.Deserialize<List<UserTestData>>(data);

                foreach(var user in users)
                {
                    var u = new User{
                        Id = user.Id,
                        Username = user.Username,
                        Email = user.Email,
                        ImageUrl = user.ImageUrl.IsNullOrEmpty() ?  _config["Images:Defaults:ProfileImage"] : user.ImageUrl,
                        Role = Models.Enums.Role.User,
                        Watched = _context.Films.Where(x => user.Watched.Contains(x.Id)).ToList(),
                        Likes = _context.People.Where(x => user.Likes.Contains(x.Id)).ToList()
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
    }
}