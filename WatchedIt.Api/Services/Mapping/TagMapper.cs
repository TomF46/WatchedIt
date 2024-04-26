using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.TagModels;

namespace WatchedIt.Api.Services.Mapping
{
    public class TagMapper
    {
        public static GetTagDto Map(Tag tag)
        {
            return new GetTagDto
            {
                Id = tag.Id,
                Name = tag.Name,
                Type = tag.Type.ToString()
            };
        }
    }
}