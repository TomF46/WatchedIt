using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.UserModels;

namespace WatchedIt.Api.Models.FilmListModels
{
    public class GetFilmListDto
    {
        public int Id {get;set;}
        public string? Name {get; set;}
        public string? Description {get; set;}
        public GetSimpleUserDto CreatedBy {get; set;}
        public ICollection<GetFilmOverviewDto> Films { get; set; } = new List<GetFilmOverviewDto>();
    }
}