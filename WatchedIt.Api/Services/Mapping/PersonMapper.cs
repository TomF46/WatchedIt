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
                FullName= $"{person.FirstName} {person.LastName}",
                DateOfBirth = person.DateOfBirth,
                Description = person.Description,
                ImageUrl = person.ImageUrl,
                Credits = CreditMapper.MapPersonCastCrewCreditDto(person.Credits.ToList()),
                LikedByCount = person.LikedBy.Count()
            };
        }

        public static GetPersonOverviewDto MapOverview(Person person){
            return new GetPersonOverviewDto{
                Id = person.Id,
                FirstName = person.FirstName,
                LastName = person.LastName,
                MiddleNames = person.MiddleNames,
                StageName = person.StageName,
                FullName= $"{person.FirstName} {person.LastName}",
                DateOfBirth = person.DateOfBirth,
                Description = person.Description,
                ImageUrl = person.ImageUrl,
                LikesCount = person.LikedBy.Count(),
                CreditCount = person.Credits.Count()
            };
        }

        public static GetSimplePersonDto MapSimple(Person person){
            return new GetSimplePersonDto {
                Id = person.Id,
                FirstName = person.FirstName,
                LastName = person.LastName,
                FullName= $"{person.FirstName} {person.LastName}",
                ImageUrl = person.ImageUrl
            };
        }

        public static Person MapForAdding(AddPersonDto newPerson){
            return new Person {
                FirstName = newPerson.FirstName,
                LastName = newPerson.LastName,
                MiddleNames = string.IsNullOrWhiteSpace(newPerson.MiddleNames) ? null : newPerson.MiddleNames,
                StageName = string.IsNullOrWhiteSpace(newPerson.StageName) ? null : newPerson.StageName,
                DateOfBirth = newPerson.DateOfBirth,
                Description = newPerson.Description,
                ImageUrl = newPerson.ImageUrl
            };
        }
    }
}