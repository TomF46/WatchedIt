using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.CategoryModels;

namespace WatchedIt.Api.Services.CategoryService
{
    public interface ICategoryService
    {
        Task<List<GetCategoryDto>> GetAll();
        Task<GetCategoryDto> GetById(int id);
        Task<GetCategoryDto> Add(AddCategoryDto newCategory);
        Task<GetCategoryDto> Update(int id, UpdateCategoryDto updatedCategory);
        void Delete(int id);
    }
}