using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Helpers
{
    public class PersonSearchHelper
    {
        public IQueryable<Person> searchPeople(IQueryable<Person> people, PersonSearchWithPaginationParameters parameters)
        {
            if (!string.IsNullOrWhiteSpace(parameters.FirstName))
            {
                var searchFirstName = parameters.FirstName.Trim().ToLower();
                people = people.Where(f => f.FirstName.ToLower().Contains(searchFirstName));
            }

            if (!string.IsNullOrWhiteSpace(parameters.LastName))
            {
                var searchLastName = parameters.LastName.Trim().ToLower();
                people = people.Where(f => f.LastName.ToLower().Contains(searchLastName));
            }

            if (!string.IsNullOrWhiteSpace(parameters.StageName))
            {
                var searchStageName = parameters.StageName.Trim().ToLower();
                people = people.Where(f => f.StageName.ToLower().Contains(searchStageName));
            }

            switch (parameters.Sort)
            {
                case "fName_desc":
                    people = people.OrderByDescending(x => x.FirstName).ThenBy(x => x.LastName); ;
                    break;
                case "fName_asc":
                    people = people.OrderBy(x => x.FirstName).ThenBy(x => x.LastName);
                    break;
                case "lName_desc":
                    people = people.OrderByDescending(x => x.LastName);
                    break;
                case "lName_asc":
                    people = people.OrderBy(x => x.LastName);
                    break;
                case "dob_desc":
                    people = people.OrderByDescending(x => x.DateOfBirth).ThenBy(x => x.LastName);
                    break;
                case "dob_asc":
                    people = people.OrderBy(x => x.DateOfBirth).ThenBy(x => x.LastName);
                    break;
                case "likes_desc":
                    people = people.OrderByDescending(x => x.LikedBy.Count()).ThenBy(x => x.LastName);
                    break;
                case "likes_asc":
                    people = people.OrderBy(x => x.LikedBy.Count()).ThenBy(x => x.LastName);
                    break;
                default:
                    people = people.OrderByDescending(x => x.LikedBy.Count()).ThenBy(x => x.LastName);
                    break;
            }

            return people;
        }
    }
}