using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using WatchedIt.Api.Models.News;
using WatchedIt.Api.Services.Mapping;
using WatchedIt.Api.Services.NewsArticleService;

namespace WatchedIt.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsArticlesController : ControllerBase
    {
        private readonly INewsArticleService _newsArticlesService;
        public NewsArticlesController(INewsArticleService newsArticlesService)
        {
            _newsArticlesService = newsArticlesService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse<GetNewsArticleOverviewDto>>> Get([FromQuery] NewsArticleSearchWithPaginationParameters parameters){
            return Ok(await _newsArticlesService.GetAll(parameters));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetNewsArticleDto>> GetSingle(int id){
            return Ok(await _newsArticlesService.GetById(id));
        }

        [HttpPost]
        public async Task<ActionResult<GetNewsArticleDto>> AddNewsArticle(AddNewsArticleDto newArticle)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _newsArticlesService.Add(userId, newArticle));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GetNewsArticleDto>> UpdateNewsArticle(int id, UpdateNewsArticleDto updatedArticle)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _newsArticlesService.Update(id ,userId, updatedArticle));
        }

        [HttpPost("{id}/published")]
        public async Task<ActionResult<GetNewsArticleDto>> SetNewsArticlePublished(int id, PublishArticleDto publishArticle)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            return Ok(await _newsArticlesService.SetArticlePublished(id ,userId, publishArticle.Publish));
        }

    }
}