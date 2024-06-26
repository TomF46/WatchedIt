using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

using WatchedIt.Api.Helpers;
using WatchedIt.Api.Models.Files;
using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Data.Seeders
{
    public class PersonTestData : AddPersonDto
    {
        public int Id { get; set;}
        public IList<string> Images { get; set; } = new List<string>();
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
                string data = FileHelper.GetJSONData(_env.ContentRootPath, "PeopleTestData.json");
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
                        DateOfBirth = person.DateOfBirth,
                    };

                    foreach(var image in person.Images){
                        var personImage = new PersonImage{
                            Person = p,
                            Url = image
                        };
                        _context.PersonImages.Add(personImage);
                    }

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
    }
}