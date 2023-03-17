using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.UserModels;

namespace WatchedIt.Api.Services.Mapping
{
    public static class UserMapper
    {
        public static GetUserDto Map(User user){
            return new GetUserDto {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username,
                WatchedFilmCount = user.Watched.Count()
            };
        }
    }
}