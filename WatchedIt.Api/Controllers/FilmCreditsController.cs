using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.CreditModels;
using WatchedIt.Api.Services.CreditService;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/Films/{id}/credits")]
    public class FilmCreditsController : ControllerBase
    {
        private readonly ICreditService _creditService;
        public FilmCreditsController(ICreditService creditService)
        {
            _creditService = creditService;
        }

        [HttpGet]
        public async Task<ActionResult<GetFilmCastCrewCreditsDto>> Get(int id){
            return Ok(await _creditService.GetCreditsForFilmById(id));
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<ActionResult<GetCreditDto>> AddCredit(int id, AddFilmCreditDto newCredit)
        {
            var credit = CreditMapper.MapToAddCreditDto(id, newCredit);
            return Ok(await _creditService.Add(credit));
        }
    }
}