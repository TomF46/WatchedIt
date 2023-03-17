using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Services.Mapping
{
    public static class AuthMapper
    {
        public static int MapLoggedInUserId(HttpContext context)
        {
            // if(context.User.Identity is null) throw BadRequestException("User is not logged in"); 
            // if(context.User.Identity.Name is null) throw BadRequestException("User is not logged in"); 
            return int.Parse(context.User.Identity.Name);
        }
    }
}