using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Film;

namespace WatchedIt.Api
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Film, GetFilmDto>();
            CreateMap<AddFilmDto, Film>();
            CreateMap<UpdateFilmDto, Film>();
        }
    }
}