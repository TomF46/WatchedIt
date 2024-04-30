using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.TagModels;

namespace WatchedIt.Api.Services.TagService
{
    public interface ITagService
    {
        Task<GetTagsDto> GetAll();
        Task<GetTagDto> GetById(int id);
        Task<GetTagDto> Add(AddTagDto newTag);
        Task<GetTagDto> Update(int id, UpdateTagDto updatedTag);
        void Delete(int id);
    }
}