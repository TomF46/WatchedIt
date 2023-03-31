using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.CreditModels
{
    public class GetFilmCastCrewCreditsDto
    {
        public List<GetCreditForFilmDto> Cast {get; set;} = new List<GetCreditForFilmDto>();
        public List<GetCreditForFilmDto> Crew {get; set;} = new List<GetCreditForFilmDto>();
    }
}