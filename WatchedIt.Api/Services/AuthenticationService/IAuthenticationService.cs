using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Authentication;

namespace WatchedIt.Api.Services.AuthenticationService
{
    public interface IAuthenticationService
    {
        User Authenticate(string email, string password);
        User GetById(int id);
        User Create(User user, string password);
    }
}