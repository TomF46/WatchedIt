using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.TagModels
{
    public class GetTagsDto
    {
        public ICollection<GetTagDto> Languages { get; set; } = new List<GetTagDto>();
        public ICollection<GetTagDto> AgeRatings { get; set; } = new List<GetTagDto>();
        public ICollection<GetTagDto> OtherTags { get; set; } = new List<GetTagDto>();
    }
}