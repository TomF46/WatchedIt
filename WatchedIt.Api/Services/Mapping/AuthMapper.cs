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
            return int.Parse(context.User.Identity.Name);
        }
    }
}