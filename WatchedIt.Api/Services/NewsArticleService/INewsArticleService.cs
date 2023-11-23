using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.News;

namespace WatchedIt.Api.Services.NewsArticleService
{
    public interface INewsArticleService
    {
        Task<PaginationResponse<GetNewsArticleOverviewDto>> GetAll(PaginationParameters parameters);
        Task<GetNewsArticleDto> GetById(int id);
        Task<GetNewsArticleDto> Add(int userId, AddNewsArticleDto newArticle);
        Task<GetNewsArticleDto> Update(int id, int userId, UpdateNewsArticleDto updatedArticle);
        Task<GetNewsArticleDto> SetArticlePublished(int id, int userId, bool isPublished);
    }
}