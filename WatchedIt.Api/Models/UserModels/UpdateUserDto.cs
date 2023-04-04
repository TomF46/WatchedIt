using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.UserModels
{
    public class UpdateUserDto
    {
        public string? ImageUrl {get;set;}
        public string? Biography {get;set;}
    }
}