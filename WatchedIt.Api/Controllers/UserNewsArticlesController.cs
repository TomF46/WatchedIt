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
    [Route("api/Users/{id}/newsArticles")]
    public class UserNewsArticlesController : ControllerBase
    {
        private readonly INewsArticleService _newsArticlesService;
        public UserNewsArticlesController(INewsArticleService newsArticlesService)
        {
            _newsArticlesService = newsArticlesService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginationResponse<GetNewsArticleOverviewDto>>> Get(int id, [FromQuery] NewsArticleSearchWithPaginationParameters parameters)
        {
            var userId = AuthMapper.MapLoggedInUserId(HttpContext);
            parameters.Publisher = null; //Ignore any publisher param in this case.
            return Ok(await _newsArticlesService.GetAllForUser(id, userId, parameters));
        }
    }
}