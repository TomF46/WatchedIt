using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.CreditModels
{
    public class GetPersonCastCrewCreditsDto
    {
        public List<GetCreditForPersonDto> Cast {get; set;} = new List<GetCreditForPersonDto>();
        public List<GetCreditForPersonDto> Crew {get; set;} = new List<GetCreditForPersonDto>();
    }
}