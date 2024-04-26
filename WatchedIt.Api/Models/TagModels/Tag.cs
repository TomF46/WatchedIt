using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.FilmModels;

namespace WatchedIt.Api.Models.TagModels
{
    public class Tag
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        public TagType Type { get; set; }
        public ICollection<Film> Films { get; set; } = new List<Film>();
    }
}