using WatchedIt.Api.Models.NewsCategoryModels;

namespace WatchedIt.Api.Services.NewsCategoryService
{
    public interface INewsCategoryService
    {
         Task<List<GetNewsCategoryDto>> GetAll();
        Task<GetNewsCategoryDto> GetById(int id);
        Task<GetNewsCategoryDto> Add(AddNewsCategoryDto newCategory);
        Task<GetNewsCategoryDto> Update(int id, UpdateNewsCategoryDto updatedCategory);
        void Delete(int id);
    }
}