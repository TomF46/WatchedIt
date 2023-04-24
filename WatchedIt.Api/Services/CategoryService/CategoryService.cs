using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.CategoryModels;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.CategoryService
{
    public class CategoryService : ICategoryService
    {
        private readonly WatchedItContext _context;
        public CategoryService(WatchedItContext context)
        {
            _context = context;
        }
        public async Task<List<GetCategoryDto>> GetAll()
        {
            var categories = await _context.Categories.OrderBy(c => c.Name).ToListAsync();
            return categories.Select(c => CategoryMapper.Map(c)).ToList();
        }

        public async Task<GetCategoryDto> GetById(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if(category is null) throw new NotFoundException($"Category with Id '{id}' not found.");
            return CategoryMapper.Map(category);
        }

        public async Task<GetCategoryDto> Add(AddCategoryDto newCategory)
        {
            var category = new Category{
                Name = newCategory.Name
            };
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return CategoryMapper.Map(category);
        }

        public async Task<GetCategoryDto> Update(int id, UpdateCategoryDto updatedCategory)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            if(category is null) throw new NotFoundException($"Category with Id '{id}' not found.");
            category.Name = updatedCategory.Name;
            await _context.SaveChangesAsync();
            return CategoryMapper.Map(category);
        }

        public void Delete(int id)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == id);
            if(category is null) throw new NotFoundException($"Category with Id '{id}' not found.");
            _context.Categories.Remove(category);
            _context.SaveChanges();
            return;
        }
    }
}