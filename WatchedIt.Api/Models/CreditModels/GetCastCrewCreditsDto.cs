using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.CreditModels
{
    public class GetCastCrewCreditsDto
    {
        public List<GetCreditDto> Cast {get; set;} = new List<GetCreditDto>();
        public List<GetCreditDto> Crew {get; set;} = new List<GetCreditDto>();
    }
}