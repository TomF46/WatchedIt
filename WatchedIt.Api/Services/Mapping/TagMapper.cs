using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.TagModels;
using WatchedIt.Api.Models.Enums;

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
                Type = tag.Type,
                TypeText = tag.Type.ToString()
            };
        }

        public static GetTagsDto MapAll(List<Tag> tags)
        {
            return new GetTagsDto
            {
                Languages = tags.Where(t => t.Type == TagType.Language).Select(t => Map(t)).ToList(),
                AgeRatings = tags.Where(t => t.Type == TagType.AgeRating).Select(t => Map(t)).ToList(),
                OtherTags = tags.Where(t => t.Type == TagType.Recommended).Select(t => Map(t)).ToList()
            };
        }
    }
}