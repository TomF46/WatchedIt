using System.Text.Json;

using WatchedIt.Api.Models.CreditModels;

using WatchedIt.Api.Models.Enums;

namespace WatchedIt.Api.Data.Seeders
{
    public class CastCreditSeeder
    {
        private readonly WatchedItContext _context;
        private readonly IHostEnvironment _env;


        public CastCreditSeeder(WatchedItContext context, IHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public void SeedCastCredits()
        {
            if(!_context.Credits.Where(x => x.Type == CreditType.Cast).Any())
            {
                string data = GetData("CastCreditTestData.json");
                var credits = JsonSerializer.Deserialize<List<Dictionary<string,string>>>(data);

                foreach(var credit in credits)
                {
                    var c = new Credit{
                        FilmId = int.Parse(credit["FilmId"]),
                        PersonId = int.Parse(credit["PersonId"]),
                        Type = CreditType.Cast,
                        Role = credit["Role"]
                    };
                    _context.Credits.Add(c);
                }
                _context.SaveChanges();
            }
        }

        public void SeedCrewCredits()
        {
            if(!_context.Credits.Where(x => x.Type == CreditType.Crew).Any())
            {
                string data = GetData("CrewCreditTestData.json");
                var credits = JsonSerializer.Deserialize<List<Dictionary<string,string>>>(data);

                foreach(var credit in credits)
                {
                    var c = new Credit{
                        FilmId = int.Parse(credit["FilmId"]),
                        PersonId = int.Parse(credit["PersonId"]),
                        Type = CreditType.Crew,
                        Role = credit["Role"]
                    };
                    _context.Credits.Add(c);
                }
                _context.SaveChanges();
            }
        }


        private string GetData(string path)
        {
            string rootPath = _env.ContentRootPath;
            string filePath = Path.GetFullPath(Path.Combine(rootPath, "Data/TestData", path));

            using (var r = new StreamReader(filePath))
            {
                string json = r.ReadToEnd();
                return json;
            }
        }
    }
}