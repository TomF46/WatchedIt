using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using WatchedIt.Api.Models.NewsCategoryModels;
using WatchedIt.Api.Services.NewsCategoryService;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsCategoriesController : ControllerBase
    {
        private readonly INewsCategoryService _newsCategoryService;
        public NewsCategoriesController(INewsCategoryService newsCategoryService)
        {
            _newsCategoryService = newsCategoryService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GetNewsCategoryDto>>> Get()
        {
            return Ok(await _newsCategoryService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetNewsCategoryDto>> GetSingle(int id)
        {
            return Ok(await _newsCategoryService.GetById(id));
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<ActionResult<GetNewsCategoryDto>> AddNewsCategory(AddNewsCategoryDto newNewsCategory)
        {
            return Ok(await _newsCategoryService.Add(newNewsCategory));
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<ActionResult<GetNewsCategoryDto>> UpdateNewsCategory(int id, UpdateNewsCategoryDto updatedNewsCategory)
        {
            return Ok(await _newsCategoryService.Update(id, updatedNewsCategory));
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public ActionResult DeleteNewsCategory(int id)
        {
            _newsCategoryService.Delete(id);
            return Ok();
        }
    }
}