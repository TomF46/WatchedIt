using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmModels;

namespace WatchedIt.Api.Data.Seeders
{
    public class FilmSeeder
    {
        private readonly WatchedItContext _context;
        private readonly IHostEnvironment _env;


        public FilmSeeder(WatchedItContext context, IHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public void Seed()
        {
            if(!_context.Films.Any())
            {
                string data = GetData();
                var films = JsonSerializer.Deserialize<List<Dictionary<string,string>>>(data);

                foreach(var film in films)
                {
                    var f = new Film{
                        Id = int.Parse(film["Id"]),
                        Name = film["Name"],
                        ShortDescription = film["ShortDescription"],
                        FullDescription = film["FullDescription"],
                        Runtime = int.Parse(film["Runtime"]),
                        ReleaseDate = DateTime.Parse(film["ReleaseDate"]),
                        PosterUrl = film["PosterUrl"],
                        TrailerUrl = film["TrailerUrl"]
                    };
                    
                    _context.Database.OpenConnection();
                    try
                    {
                        _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Films ON");
                         _context.Films.Add(f);
                        _context.SaveChanges();
                        _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT dbo.Films OFF");
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
            string filePath = Path.GetFullPath(Path.Combine(rootPath, "Data/TestData", "FilmTestData.json"));

            using (var r = new StreamReader(filePath))
            {
                string json = r.ReadToEnd();
                return json;
            }
        }
    }
}