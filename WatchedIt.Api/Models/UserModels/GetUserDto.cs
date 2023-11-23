using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.UserModels
{
    public class GetUserDto
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Email {get;set;}
        public int WatchedFilmCount {get;set;}
        public string? ImageUrl {get;set;}
        public string? Biography {get;set;}
        public bool CanPublish {get; set;}
    }
}