using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Data.Seeders
{
    public class PersonTestData : AddPersonDto
    {
        public int Id { get; set;}
    }

    public class PeopleSeeder
    {
        private readonly WatchedItContext _context;
        private readonly IHostEnvironment _env;


        public PeopleSeeder(WatchedItContext context, IHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public void Seed()
        {
            if(!_context.People.Any())
            {
                string data = GetData();
                var people = JsonSerializer.Deserialize<List<PersonTestData>>(data);

                foreach(var person in people)
                {
                    var p = new Person{
                        Id = person.Id,
                        FirstName = person.FirstName,
                        LastName = person.LastName,
                        MiddleNames = person.MiddleNames,
                        StageName = person.StageName,
                        Description = person.Description,
                        ImageUrl = person.ImageUrl,
                        DateOfBirth = person.DateOfBirth
                    };

                    _context.Database.OpenConnection();
                    try
                    {
                        _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.People ON");
                         _context.People.Add(p);
                        _context.SaveChanges();
                        _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.People OFF");
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
            string filePath = Path.GetFullPath(Path.Combine(rootPath, "Data/TestData", "PeopleTestData.json"));

            using (var r = new StreamReader(filePath))
            {
                string json = r.ReadToEnd();
                return json;
            }
        }
    }
}