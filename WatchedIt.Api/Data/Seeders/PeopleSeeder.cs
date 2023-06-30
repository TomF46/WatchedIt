using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Data.Seeders
{
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
                var people = JsonSerializer.Deserialize<List<Dictionary<string,string>>>(data);

                foreach(var person in people)
                {
                    var p = new Person{
                        FirstName = person["FirstName"],
                        LastName = person["LastName"],
                        MiddleNames = person["MiddleNames"],
                        StageName = person["StageName"],
                        Description = person["Description"],
                        ImageUrl = person["ImageUrl"],
                        DateOfBirth = DateTime.Parse(person["DateOfBirth"])
                    };

                    _context.People.Add(p);
                }
                _context.SaveChanges();
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