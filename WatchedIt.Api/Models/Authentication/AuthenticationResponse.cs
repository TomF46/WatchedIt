using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.Authentication
{
    public class AuthenticationResponse
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Email {get;set;}
        public string? Token { get; set; }
        public DateTime TokenExpiry { get; set; }
    }
}