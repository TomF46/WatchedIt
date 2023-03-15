using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.CreditModels;
using WatchedIt.Api.Services.CreditService;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CreditsController : ControllerBase
    {
        private readonly ICreditService _creditService;

        public CreditsController(ICreditService creditService)
        {
            _creditService = creditService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GetCreditDto>>> Get(){
            return Ok(await _creditService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetCreditDto>> GetSingle(int id){
            var credit = await _creditService.GetById(id);

            if(credit is null) throw new NotFoundException($"Credit with Id '{id}' not found.");

            return Ok(credit);
        }

        [HttpPost]
        public async Task<ActionResult<GetCreditDto>> AddCredit(AddCreditDto newCredit)
        {
            return Ok(await _creditService.Add(newCredit));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GetCreditDto>> UpdateCredit(int id, UpdatedCreditDto updatedCredit){
            return Ok(await _creditService.Update(id, updatedCredit));
        }

        
        [HttpDelete("{id}")]
        public ActionResult DeleteCredit(int id){
            _creditService.Delete(id);
            return Ok();
        }
    }
}