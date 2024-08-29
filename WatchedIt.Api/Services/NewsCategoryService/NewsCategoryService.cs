using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.NewsCategoryModels;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.NewsCategoryService
{
    public class NewsCategoryService : INewsCategoryService
    {
        private readonly WatchedItContext _context;
        public NewsCategoryService(WatchedItContext context)
        {
            _context = context;
        }
        public async Task<List<GetNewsCategoryDto>> GetAll()
        {
            var NewsCategories = await _context.NewsCategories.OrderBy(c => c.Name).ToListAsync();
            return NewsCategories.Select(c => NewsCategoryMapper.Map(c)).ToList();
        }

        public async Task<GetNewsCategoryDto> GetById(int id)
        {
            var NewsCategory = await _context.NewsCategories.FirstOrDefaultAsync(c => c.Id == id);
            if (NewsCategory is null) throw new NotFoundException($"NewsCategory with Id '{id}' not found.");
            return NewsCategoryMapper.Map(NewsCategory);
        }

        public async Task<GetNewsCategoryDto> Add(AddNewsCategoryDto newNewsCategory)
        {
            var NewsCategory = new NewsCategory
            {
                Name = newNewsCategory.Name
            };
            await _context.NewsCategories.AddAsync(NewsCategory);
            await _context.SaveChangesAsync();
            return NewsCategoryMapper.Map(NewsCategory);
        }

        public async Task<GetNewsCategoryDto> Update(int id, UpdateNewsCategoryDto updatedNewsCategory)
        {
            var NewsCategory = await _context.NewsCategories.FirstOrDefaultAsync(c => c.Id == id);
            if (NewsCategory is null) throw new NotFoundException($"NewsCategory with Id '{id}' not found.");
            NewsCategory.Name = updatedNewsCategory.Name;
            await _context.SaveChangesAsync();
            return NewsCategoryMapper.Map(NewsCategory);
        }

        public void Delete(int id)
        {
            var NewsCategory = _context.NewsCategories.FirstOrDefault(c => c.Id == id);
            if (NewsCategory is null) throw new NotFoundException($"NewsCategory with Id '{id}' not found.");
            _context.NewsCategories.Remove(NewsCategory);
            _context.SaveChanges();
            return;
        }
    }
}