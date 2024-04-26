using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Enums;

namespace WatchedIt.Api.Models.TagModels
{
    public class GetTagDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public TagType Type { get; set; }
        public string? TypeText { get; set; }

    }
}