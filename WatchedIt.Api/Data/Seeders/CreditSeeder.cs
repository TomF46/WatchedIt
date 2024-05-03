using System.Text.Json;

using WatchedIt.Api.Helpers;

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
                string data = FileHelper.GetJSONData(_env.ContentRootPath, "CastCreditTestData.json");
                var credits = JsonSerializer.Deserialize<List<AddCreditDto>>(data);

                foreach(var credit in credits)
                {
                    var c = new Credit{
                        FilmId = credit.FilmId,
                        PersonId = credit.PersonId,
                        Type = CreditType.Cast,
                        Role = credit.Role
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
                string data = FileHelper.GetJSONData(_env.ContentRootPath, "CrewCreditTestData.json");
                var credits = JsonSerializer.Deserialize<List<AddCreditDto>>(data);

                foreach(var credit in credits)
                {
                    var c = new Credit{
                        FilmId = credit.FilmId,
                        PersonId = credit.PersonId,
                        Type = CreditType.Crew,
                        Role = credit.Role
                    };
                    _context.Credits.Add(c);
                }
                _context.SaveChanges();
            }
        }
    }
}