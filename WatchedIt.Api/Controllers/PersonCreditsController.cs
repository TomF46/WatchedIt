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
    [Route("api/People/{id}/credits")]
    public class PersonCreditsController : ControllerBase
    {
        private readonly ICreditService _creditService;
        public PersonCreditsController(ICreditService creditService)
        {
            _creditService = creditService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GetCreditForPersonDto>>> Get(int id){
            return Ok(await _creditService.GetCreditsForPersonById(id));
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<ActionResult<GetCreditDto>> AddCredit(int id, AddPersonCreditDto newCredit)
        {
            var credit = CreditMapper.MapToAddCreditDto(id, newCredit);
            return Ok(await _creditService.Add(credit));
        }
    }
}