using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.UserModels;

namespace WatchedIt.Api.Models.ReviewModels
{
    public class GetReviewDto
    {
        public int Id {get; set;}
        public GetUserDto? User {get; set;}
        public GetSimpleFilmDto? Film {get; set;}
        public double Rating {get; set;}
        public string? Text {get; set;}
    }
}