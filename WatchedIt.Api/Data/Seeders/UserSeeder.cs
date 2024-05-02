using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

using Microsoft.IdentityModel.Tokens;

using WatchedIt.Api.Models.Authentication;
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
                string data = GetData();
                var users = JsonSerializer.Deserialize<List<Dictionary<string,string>>>(data);

                foreach(var user in users)
                {
                    var u = new User{
                        Id = int.Parse(user["Id"]),
                        Username = user["Username"],
                        Email = user["Email"],
                        ImageUrl = user["ImageUrl"].IsNullOrEmpty() ?  _config["Images:Defaults:ProfileImage"] : user["ImageUrl"],
                        Role = Models.Enums.Role.User
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

        private string GetData()
        {
            string rootPath = _env.ContentRootPath;
            string filePath = Path.GetFullPath(Path.Combine(rootPath, "Data/TestData", "UserTestData.json"));

            using (var r = new StreamReader(filePath))
            {
                string json = r.ReadToEnd();
                return json;
            }
        }
    }
}