using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

using WatchedIt.Api.Helpers;
using WatchedIt.Api.Models.FilmTrivia;

namespace WatchedIt.Api.Data.Seeders
{
    class FilmTriviaTestData : AddFilmTriviaDto{
        public int FilmId { get; set;}
        public int UserId { get; set;}
    }
    public class FilmTriviaSeeder
    {
        private readonly WatchedItContext _context;
        private readonly IHostEnvironment _env;


        public FilmTriviaSeeder(WatchedItContext context, IHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public void Seed()
        {
            if(!_context.FilmTrivias.Any())
            {
                string data = FileHelper.GetJSONData(_env.ContentRootPath, "FilmTriviaTestData.json");
                var trivias = JsonSerializer.Deserialize<List<FilmTriviaTestData>>(data);

                foreach(var trivia in trivias)
                {
                    var film =  _context.Films.FirstOrDefault(x => x.Id == trivia.FilmId);
                    var r = new FilmTrivia{
                        Film = film,
                        User = _context.Users.FirstOrDefault(x => x.Id == trivia.UserId),
                        Text = trivia.Text,
                    };
                    _context.FilmTrivias.Add(r);
                }
                _context.SaveChanges();
            }
        }
    }
}