using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Services.Mapping
{
    public static class PersonMapper
    {
        public static GetPersonDto Map(Person person){
            
            return new GetPersonDto{
                Id = person.Id,
                FirstName = person.FirstName,
                LastName = person.LastName,
                MiddleNames = person.MiddleNames,
                StageName = person.StageName,
                Age = person.Age,
                Description = person.Description,
                ImageUrl = person.ImageUrl,
                Credits = person.Credits.Select(c => CreditMapper.mapForPerson(c)).ToList()
            };
        }

        public static GetPersonOverviewDto MapOverview(Person person){
            return new GetPersonOverviewDto{
                Id = person.Id,
                FirstName = person.FirstName,
                LastName = person.LastName,
                MiddleNames = person.MiddleNames,
                StageName = person.StageName,
                Age = person.Age,
                Description = person.Description,
                ImageUrl = person.ImageUrl
            };
        }

        public static GetSimplePersonDto MapSimple(Person person){
            return new GetSimplePersonDto {
                Id = person.Id,
                FirstName = person.FirstName,
                LastName = person.LastName,
                ImageUrl = person.ImageUrl
            };
        }

        public static Person MapForAdding(AddPersonDto newPerson){
            return new Person {
                FirstName = newPerson.FirstName,
                LastName = newPerson.LastName,
                MiddleNames = newPerson.MiddleNames,
                StageName = newPerson.StageName,
                Age = newPerson.Age,
                Description = newPerson.Description,
                ImageUrl = newPerson.ImageUrl
            };
        }
    }
}