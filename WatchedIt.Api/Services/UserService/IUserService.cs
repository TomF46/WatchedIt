using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.User;

namespace WatchedIt.Api.Services.UserService
{
    public interface IUserService
    {
        Task<GetUserDto> GetById(int id);
    }
}