using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.PersonModels
{
    public class GetSimplePersonDto
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? FullName { get; set; }
        public string? ImageUrl { get; set; }
        public int LikedByCount { get; set; }
        public int CreditCount { get; set; }
    }
}