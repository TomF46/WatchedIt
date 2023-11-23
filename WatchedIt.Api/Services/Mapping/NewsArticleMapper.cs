using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.News;

namespace WatchedIt.Api.Services.Mapping
{
    public static class NewsArticleMapper
    {
        public static GetNewsArticleDto Map(NewsArticle article){
            return new GetNewsArticleDto{
                Id = article.Id,
                Title = article.Title,
                Content = article.Content,
                Author = new AuthorDto{
                    Id = article.User.Id,
                    Username = article.User.Username,
                    ImageUrl = article.User.ImageUrl
                },
                CreatedDate = article.CreatedDate,
                UpdatedDate = article.UpdatedDate,
                Published = article.Published
            };
        }

        public static GetNewsArticleOverviewDto MapOverview(NewsArticle article){
            return new GetNewsArticleOverviewDto{
                Id = article.Id,
                Title = article.Title,
                AuthorName = article.User.Username,
                CreatedDate = article.CreatedDate,
                UpdatedDate = article.UpdatedDate,
                Published = article.Published
            };
        }

        public static NewsArticle MapForAdding(AddNewsArticleDto newArticle){
            return new NewsArticle{
                Title = newArticle.Title,
                Content = newArticle.Content,
                Published = newArticle.Publish
            };
        }
    }
}