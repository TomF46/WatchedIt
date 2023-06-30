using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Services.Likes
{
    public class LikesService : ILikesService
    {
        private readonly WatchedItContext _context;
        public LikesService(WatchedItContext context)
        {
            _context = context;
        }

        public async Task<bool> CurrentUserLikesPersonWithId(int id, int userId)
        {
            var currentUser = await _context.Users.Include(f => f.Likes).FirstOrDefaultAsync(u => u.Id == userId);
            if(currentUser is null) throw new BadRequestException($"User must be logged in to perform this action");
        
            var isLiked = currentUser.Likes.FirstOrDefault(x => x.Id == id);
            return isLiked != null;
        }

        public async Task<GetPersonIsLikedDto> AddLike(int id, AddLikedPersonDto likedPerson)
        {
            var user = await _context.Users.FirstOrDefaultAsync(p => p.Id == id);
            if(user is null) throw new NotFoundException($"User with Id '{id}' not found.");

            var person = await _context.People.FirstOrDefaultAsync(p => p.Id == likedPerson.PersonId);
            if(person is null) throw new BadRequestException($"Person with Id '{likedPerson.PersonId} does not exist");

            user.Likes.Add(person);
            await _context.SaveChangesAsync();
            return new GetPersonIsLikedDto{
                Liked = true
            };
        }

        public async Task<GetPersonIsLikedDto> RemoveLike(int id, int personId)
        {
            var user = await _context.Users.Include(u => u.Likes).FirstOrDefaultAsync(p => p.Id == id);
            if(user is null) throw new NotFoundException($"User with Id '{id}' not found.");

            var person = await _context.People.FirstOrDefaultAsync(p => p.Id == personId);
            if(person is null) throw new BadRequestException($"Person with Id '{personId} does not exist");

            user.Likes.Remove(person);
            await _context.SaveChangesAsync();
            return new GetPersonIsLikedDto{
                Liked = false
            };
        }
    }
}