using WatchedIt.Api.Models.NewsCategoryModels;

namespace WatchedIt.Api.Services.Mapping
{
    public class NewsCategoryMapper
    {
        public static GetNewsCategoryDto Map(NewsCategory category){
            return new GetNewsCategoryDto{
                Id = category.Id,
                Name = category.Name
            };
        }
    }
}