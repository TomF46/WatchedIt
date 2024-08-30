using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.News;

namespace WatchedIt.Api.Helpers
{
    public class NewsArticleSearchHelper
    {
        public IQueryable<NewsArticle> searchNewsArticles(WatchedItContext _context, IQueryable<NewsArticle> articles, NewsArticleSearchWithPaginationParameters parameters)
        {
            if (!string.IsNullOrWhiteSpace(parameters.Title))
            {
                var searchTitle = parameters.Title.Trim().ToLower();
                articles = articles.Where(a => a.Title.ToLower().Contains(searchTitle));
            }

            if (parameters.Category is not null)
            {
                var category = _context.NewsCategories.FirstOrDefault(x => x.Id == parameters.Category);
                if (category is null) throw new NotFoundException("Category does not exist");
                articles = articles.Where(x => x.Categories.Contains(category));
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
                case "read_desc":
                    articles = articles.OrderByDescending(x => x.ReadCount);
                    break;
                case "read_asc":
                    articles = articles.OrderBy(x => x.ReadCount);
                    break;
                default:
                    articles = articles.OrderByDescending(x => x.CreatedDate);
                    break;
            }

            return articles;
        }
    }
}