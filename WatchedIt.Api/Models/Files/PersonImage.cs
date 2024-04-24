using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Models.Files
{
    public class PersonImage
    {
        public int Id { get; set; }
        [Required]
        public string? Url { get; set; }
        public Person? Person { get; set; }
    }
}