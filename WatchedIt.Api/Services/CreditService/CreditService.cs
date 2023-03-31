using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.CreditModels;
using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.CreditService
{
    public class CreditService : ICreditService
    {
        public readonly WatchedItContext _context;
        public CreditService(WatchedItContext context)
        {
            _context = context;
        }
        public async Task<GetCastCrewCreditsDto> GetAll()
        {
            var credits = await _context.Credits.Include(c => c.Film).Include(c => c.Person).ToListAsync();
            return CreditMapper.MapCastCrewCreditDto(credits); 
        }

        public async Task<GetCreditDto> GetById(int id)
        {
            var credit = await _context.Credits.Include(c => c.Film).Include(c => c.Person).FirstOrDefaultAsync(c => c.Id == id);
            if(credit is null) throw new NotFoundException($"Credit with Id '{id}' not found.");

            return CreditMapper.map(credit);
        }

        public async Task<GetCreditDto> Add(AddCreditDto newCredit)
        {
            var person = await _context.People.FirstOrDefaultAsync(p => p.Id == newCredit.PersonId);
            if(person is null) throw new BadRequestException($"Person with Id '{newCredit.PersonId} does not exist");

            var film = await _context.Films.FirstOrDefaultAsync(f => f.Id == newCredit.FilmId);
            if(film is null) throw new BadRequestException($"Film with Id '{newCredit.FilmId} does not exist");

            var credit = new Credit{
                Film = film,
                Person = person,
                Role = newCredit.Role,
                Type = newCredit.Type
            };

            await _context.Credits.AddAsync(credit);
            await _context.SaveChangesAsync();
            return CreditMapper.map(credit);
        }

        public async Task<GetCreditDto> Update(int id, UpdatedCreditDto updatedCredit)
        {
            var credit = await _context.Credits.Include(c => c.Film).Include(c => c.Person).FirstOrDefaultAsync(c => c.Id == id);
            if(credit is null) throw new NotFoundException($"Credit with Id '{id}' not found.");
            credit.Role = updatedCredit.Role;
            credit.Type = updatedCredit.Type;
            await _context.SaveChangesAsync();
            return CreditMapper.map(credit);
        }

        public void Delete(int id)
        {
            var credit = _context.Credits.FirstOrDefault(c => c.Id == id);
            if(credit is null) throw new NotFoundException($"Credit with Id '{id}' not found.");
            _context.Credits.Remove(credit);
            _context.SaveChanges();
            return;
        }

        public async Task<GetFilmCastCrewCreditsDto> GetCreditsForFilmById(int id)
        {
            var film = await _context.Films.FirstOrDefaultAsync(f => f.Id == id);
            if(film is null) throw new BadRequestException($"Film with Id '{id} does not exist");

            var credits = await _context.Credits.Include(c => c.Person).Where(c => c.FilmId == film.Id).ToListAsync();
            return CreditMapper.MapFilmCastCrewCreditDto(credits);
        }

        public async Task<GetPersonCastCrewCreditsDto> GetCreditsForPersonById(int id)
        {
            var person = await _context.People.FirstOrDefaultAsync(p => p.Id == id);
            if(person is null) throw new BadRequestException($"Person with Id '{id} does not exist");

            var credits = await _context.Credits.Include(c => c.Film).Where(c => c.PersonId == person.Id).ToListAsync();
            return CreditMapper.MapPersonCastCrewCreditDto(credits);
        }
    }
}