using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.News;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.NewsArticleService
{
    public class NewsArticleService : INewsArticleService
    {
        private readonly WatchedItContext _context;

        public NewsArticleService(WatchedItContext context)
        {
            _context = context;
        }
        public async Task<PaginationResponse<GetNewsArticleOverviewDto>> GetAll(PaginationParameters parameters)
        {
             var query =  _context.NewsArticles.Include(a => a.User).OrderByDescending(x => x.CreatedDate);
            var count = query.Count();
            var articles = await query.Skip((parameters.PageNumber - 1) * parameters.PageSize).Take(parameters.PageSize).ToListAsync();
            var mappedArticles = articles.Select(a => NewsArticleMapper.MapOverview(a)).ToList();
            return new PaginationResponse<GetNewsArticleOverviewDto>(mappedArticles, parameters.PageNumber, parameters.PageSize, count);
        }

        public async Task<GetNewsArticleDto> GetById(int id)
        {
            var article = await _context.NewsArticles.Include(a => a.User).FirstOrDefaultAsync(a => a.Id == id);
            if(article is null) throw new BadRequestException($"Article with Id '{id}' not found.");

            return NewsArticleMapper.Map(article);
        }

        public async Task<GetNewsArticleDto> Add(int userId, AddNewsArticleDto newArticle)
        {
            var user = await _context.Users.FindAsync(userId);
            if(user is null) throw new NotFoundException($"user with Id '{userId}' not found.");
            if(!user.CanPublish) throw new Exceptions.UnauthorizedAccessException("User can not publish.");

            var article = NewsArticleMapper.MapForAdding(newArticle);
            article.User = user;
            article.CreatedDate = DateTime.Now;
            article.UpdatedDate = DateTime.Now;

            await _context.NewsArticles.AddAsync(article);
            await _context.SaveChangesAsync();

            return NewsArticleMapper.Map(article);
        }

        public async Task<GetNewsArticleDto> Update(int id, int userId, UpdateNewsArticleDto updatedArticle)
        {
            var user = await _context.Users.FindAsync(userId);
            if(user is null) throw new NotFoundException($"user with Id '{userId}' not found.");
            if(!user.CanPublish) throw new Exceptions.UnauthorizedAccessException("User can not publish.");

            var article = await _context.NewsArticles.Include(a => a.User).FirstOrDefaultAsync(x => x.Id == id);
            if(article is null) throw new NotFoundException($"Article with Id '{id}' not found.");

            if(article.User.Id != user.Id) throw new Exceptions.UnauthorizedAccessException("User does not have permission to update this article.");

            article.Title = updatedArticle.Title;
            article.Content = updatedArticle.Content;
            article.Published = updatedArticle.Publish;
            await _context.SaveChangesAsync();
            return NewsArticleMapper.Map(article);
        }

        public async Task<GetNewsArticleDto> SetArticlePublished(int id, int userId, bool isPublished)
        {
            var user = await _context.Users.FindAsync(userId);
            if(user is null) throw new NotFoundException($"user with Id '{userId}' not found.");
            if(!user.CanPublish) throw new Exceptions.UnauthorizedAccessException("User can not publish.");

            var article = await _context.NewsArticles.Include(a => a.User).FirstOrDefaultAsync(x => x.Id == id);
            if(article is null) throw new NotFoundException($"Article with Id '{id}' not found.");

            if(article.User.Id != user.Id) throw new Exceptions.UnauthorizedAccessException("User does not have permission to update the publish status of this article.");

            article.Published = isPublished;
            await _context.SaveChangesAsync();
            return NewsArticleMapper.Map(article);
        }
    }
}