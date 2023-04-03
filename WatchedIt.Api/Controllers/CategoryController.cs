using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WatchedIt.Api.Models.CategoryModels;
using WatchedIt.Api.Services.CategoryService;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        public readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GetCategoryDto>>> Get(){
            return Ok(await _categoryService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetCategoryDto>> GetSingle(int id){
            return Ok(await _categoryService.GetById(id));
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<ActionResult<GetCategoryDto>> AddCategory(AddCategoryDto newCategory)
        {
            return Ok(await _categoryService.Add(newCategory));
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<ActionResult<GetCategoryDto>> UpdateCategory(int id, UpdateCategoryDto updatedCategory){
            return Ok(await _categoryService.Update(id, updatedCategory));
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public ActionResult DeleteCategory(int id){
            _categoryService.Delete(id);
            return Ok();
        }
    }
}