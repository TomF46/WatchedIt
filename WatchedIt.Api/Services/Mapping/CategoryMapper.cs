using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.CategoryModels;

namespace WatchedIt.Api.Services.Mapping
{
    public static class CategoryMapper
    {
        public static GetCategoryDto Map(Category category){
            return new GetCategoryDto{
                Id = category.Id,
                Name = category.Name
            };
        }
    }
}