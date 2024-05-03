using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

using WatchedIt.Api.Helpers;

using WatchedIt.Api.Models.FilmListModels;

namespace WatchedIt.Api.Data.Seeders
{
    public class FilmListTestData : AddFilmListDto
    {
        public int UserId { get; set;}
        public IList<int> Films { get; set; } = new List<int>();
    }

    public class FilmListSeeder
    {
        private readonly WatchedItContext _context;
        private readonly IHostEnvironment _env;


        public FilmListSeeder(WatchedItContext context, IHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public void Seed()
        {
            if(!_context.FilmLists.Any())
            {
                string data = FileHelper.GetJSONData(_env.ContentRootPath, "FilmListTestData.json");
                var lists = JsonSerializer.Deserialize<List<FilmListTestData>>(data);

                foreach(var list in lists)
                {
                    var l = new FilmList{
                        Name = list.Name,
                        Description = list.Description,
                        CreatedBy = _context.Users.FirstOrDefault(x => x.Id == list.UserId),
                        Films = _context.Films.Where(x => list.Films.Contains(x.Id)).ToList(),
                    };

                    _context.FilmLists.Add(l);
                }
                _context.SaveChanges();
            }
        }
    }
}