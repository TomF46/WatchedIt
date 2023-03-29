using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.PersonService
{
    public class PersonService : IPersonService
    {
        public readonly WatchedItContext _context;
        public PersonService(WatchedItContext context)
        {
            _context = context;       
        }

        public async Task<List<GetPersonOverviewDto>> GetAll(SearchWithPaginationParameters parameters)
        {
            var query = _context.People.AsQueryable();

            if(!string.IsNullOrWhiteSpace(parameters.SearchTerm)){
                var searchTerm = parameters.SearchTerm.Trim().ToLower();
                query = query.Where(
                    f => f.FirstName.ToLower().Contains(searchTerm) || 
                    f.LastName.ToLower().Contains(searchTerm) ||
                    f.StageName.ToLower().Contains(searchTerm)
                );
            }

            var people = await query.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize).ToListAsync();
            return people.Select(p => PersonMapper.MapOverview(p)).ToList();
        }

        public async Task<GetPersonDto> GetById(int id)
        {
            var person = await _context.People.Include(f => f.Credits).ThenInclude(c => c.Film).Include(f => f.Credits).ThenInclude(c => c.Person).FirstOrDefaultAsync(p => p.Id == id);
            if(person is null) throw new NotFoundException($"Person with Id '{id}' not found.");
            return PersonMapper.Map(person);
        }

        public async Task<GetPersonOverviewDto> Add(AddPersonDto newPerson)
        {
            var person = PersonMapper.MapForAdding(newPerson);
            await _context.People.AddAsync(person);
            await _context.SaveChangesAsync();
            return PersonMapper.MapOverview(person);
        }

        public async Task<GetPersonOverviewDto> Update(int id, UpdatePersonDto updatedPerson)
        {
            var person = await _context.People.FirstOrDefaultAsync(p => p.Id == id);
            if(person is null) throw new NotFoundException($"Person with Id '{id}' not found.");
            person.FirstName = updatedPerson.FirstName;
            person.LastName = updatedPerson.LastName;
            person.MiddleNames = updatedPerson.MiddleNames;
            person.StageName = updatedPerson.StageName;
            person.Age = updatedPerson.Age;
            person.Description = updatedPerson.Description;
            person.ImageUrl = updatedPerson.ImageUrl;
            await _context.SaveChangesAsync();
            return PersonMapper.MapOverview(person);
        }

        public void Delete(int id)
        {
            var person = _context.People.FirstOrDefault(p => p.Id == id);
            if(person is null) throw new NotFoundException($"Person with Id '{id}' not found.");
            _context.People.Remove(person);
            _context.Entry(person).State = EntityState.Deleted;
            _context.SaveChanges();
            return;
        }
    }
}