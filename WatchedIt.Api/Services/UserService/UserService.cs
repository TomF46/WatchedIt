using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.User;
using WatchedIt.Api.Services.Mapping;

namespace WatchedIt.Api.Services.UserService
{
    public class UserService : IUserService
    {
        public readonly WatchedItContext _context;
        public UserService(WatchedItContext context)
        {
            _context = context;
        }
        public async Task<GetUserDto> GetById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if(user is null) throw new NotFoundException($"user with Id '{id}' not found.");
            return UserMapper.map(user);
        }
    }
}