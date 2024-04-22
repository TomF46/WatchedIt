using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.FilmModels;

namespace WatchedIt.Api.Models.Files
{
    public class FilmImage
    {
        public int Id { get; set; }
        [Required]
        public string? Url { get; set; }
        public Film? Film { get; set; }
    }
}