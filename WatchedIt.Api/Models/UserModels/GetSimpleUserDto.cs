using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.UserModels
{
    public class GetSimpleUserDto
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? ImageUrl {get;set;}

    }
}