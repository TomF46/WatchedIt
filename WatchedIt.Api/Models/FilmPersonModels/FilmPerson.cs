using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Models.FilmPersonModels
{
    public class FilmPerson
    {
        public int WatchedById {get;set;}
        public Person? WatchedBy {get;set;}
        public int WatchedId {get;set;}
        public Film? Watched {get;set;}

    }
}