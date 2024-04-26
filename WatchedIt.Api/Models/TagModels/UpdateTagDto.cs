using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Enums;

namespace WatchedIt.Api.Models.TagModels
{
    public class UpdateTagDto
    {
        public string? Name { get; set; }
        public TagType Type { get; set; }
    }
}