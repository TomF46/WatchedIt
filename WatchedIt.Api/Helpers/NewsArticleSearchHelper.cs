using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.News;

namespace WatchedIt.Api.Helpers
{
    public class NewsArticleSearchHelper
    {
        public IQueryable<NewsArticle> searchNewsArticles(IQueryable<NewsArticle> articles, NewsArticleSearchWithPaginationParameters parameters)
        {
            if (!string.IsNullOrWhiteSpace(parameters.Title))
            {
                var searchTitle = parameters.Title.Trim().ToLower();
                articles = articles.Where(a => a.Title.ToLower().Contains(searchTitle));
            }

            if (!string.IsNullOrWhiteSpace(parameters.Publisher))
            {
                var searchPublisher = parameters.Publisher.Trim().ToLower();
                articles = articles.Where(a => a.User.Username.ToLower().Contains(searchPublisher));
            }

            switch (parameters.Sort)
            {
                case "created_desc":
                    articles = articles.OrderByDescending(x => x.CreatedDate);
                    break;
                case "created_asc":
                    articles = articles.OrderBy(x => x.CreatedDate);
                    break;
                default:
                    articles = articles.OrderByDescending(x => x.CreatedDate);
                    break;
            }

            return articles;
        }
    }
}