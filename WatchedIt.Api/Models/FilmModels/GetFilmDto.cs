using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.CategoryModels;
using WatchedIt.Api.Models.CreditModels;
using WatchedIt.Api.Models.TagModels;

namespace WatchedIt.Api.Models.FilmModels
{
    public class GetFilmDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? ShortDescription { get; set; }
        public string? FullDescription { get; set; }
        public int Runtime { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public string? PosterUrl { get; set; }
        public string? AverageRating { get; set; }
        public string? TrailerUrl { get; set; }
        public GetFilmCastCrewCreditsDto Credits { get; set; }
        public bool IsWatchedByUser { get; set; } = false;
        public IList<GetCategoryDto> Categories { get; set; } = new List<GetCategoryDto>();
        public IList<GetTagDto> Languages { get; set; } = new List<GetTagDto>();
        public IList<GetTagDto> AgeRatings { get; set; } = new List<GetTagDto>();
        public IList<GetTagDto> OtherTags { get; set; } = new List<GetTagDto>();
        public int WatchedByCount { get; set; }
        public bool IsReleased { get; set; } = false;

    }
}