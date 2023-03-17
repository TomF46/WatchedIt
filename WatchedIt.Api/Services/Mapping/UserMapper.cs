using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.User;

namespace WatchedIt.Api.Services.Mapping
{
    public static class UserMapper
    {
        public static GetUserDto map(User user){
            return new GetUserDto {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username
            };
        }
    }
}