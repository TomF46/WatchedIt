using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.Files
{
    public class GetImageDto
    {
        public int Id { get; set; }
        public string? Url { get; set; }
    }
}