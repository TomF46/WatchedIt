using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

using WatchedIt.Api.Helpers;
using WatchedIt.Api.Models.FilmModels;

namespace WatchedIt.Api.Data.Seeders
{
    class FilmTestData : AddFilmDto{
        public int Id { get; set;}
        public IList<int> Tags { get; set; } = new List<int>();
    }
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
                string data = FileHelper.GetJSONData(_env.ContentRootPath, "FilmTestData.json");
                var films = JsonSerializer.Deserialize<List<FilmTestData>>(data);

                foreach(var film in films)
                {
                    var f = new Film{
                        Id = film.Id,
                        Name = film.Name,
                        ShortDescription = film.ShortDescription,
                        FullDescription = film.FullDescription,
                        Runtime = film.Runtime,
                        ReleaseDate = film.ReleaseDate,
                        PosterUrl = film.PosterUrl,
                        TrailerUrl = film.TrailerUrl,
                        Categories =  _context.Categories.Where(x => film.Categories.Contains(x.Id)).ToList(),
                        Tags =  _context.Tags.Where(x => film.Tags.Contains(x.Id)).ToList()
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
    }
}