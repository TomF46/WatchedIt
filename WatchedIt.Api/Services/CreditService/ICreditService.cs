using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.CreditModels;

namespace WatchedIt.Api.Services.CreditService
{
    public interface ICreditService
    {
        Task<GetCastCrewCreditsDto> GetAll();
        Task<GetCreditDto> GetById(int id);
        Task<GetCreditDto> Add(AddCreditDto newCredit);
        Task<GetCreditDto> Update(int id ,UpdatedCreditDto updatedCredit);
        void Delete(int id);
        Task<GetFilmCastCrewCreditsDto> GetCreditsForFilmById(int id);
        Task<GetPersonCastCrewCreditsDto> GetCreditsForPersonById(int id);
    }
}