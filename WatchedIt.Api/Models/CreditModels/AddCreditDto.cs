using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Enums;

namespace WatchedIt.Api.Models.CreditModels
{
    public class AddCreditDto
    {
        public int FilmId {get;set;}
        public int PersonId {get;set;}
        public string? Role {get;set;}
        public CreditType Type {get;set;}
    }
}