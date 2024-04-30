using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using WatchedIt.Api.Models.TagModels;
using WatchedIt.Api.Services.TagService;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagsController : ControllerBase
    {
        private readonly ITagService _tagService;
        public TagsController(ITagService tagService)
        {
            _tagService = tagService;
        }

        [HttpGet]
        public async Task<ActionResult<GetTagsDto>> Get()
        {
            return Ok(await _tagService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetTagDto>> GetSingle(int id)
        {
            return Ok(await _tagService.GetById(id));
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<ActionResult<GetTagDto>> AddTag(AddTagDto newTag)
        {
            return Ok(await _tagService.Add(newTag));
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<ActionResult<GetTagDto>> UpdateTag(int id, UpdateTagDto updatedTag)
        {
            return Ok(await _tagService.Update(id, updatedTag));
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public ActionResult DeleteTag(int id)
        {
            _tagService.Delete(id);
            return Ok();
        }
    }
}