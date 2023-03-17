using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.User
{
    public class GetUserDto
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Email {get;set;}
    }
}