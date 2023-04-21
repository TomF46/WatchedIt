using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Services.Likes
{
    public interface ILikesService
    {
        Task<bool> CurrentUserLikesPersonWithId(int id, int userId);
        Task<GetPersonIsLikedDto> AddLike(int id, AddLikedPersonDto likedPerson);
        Task<GetPersonIsLikedDto> RemoveLike(int id, int personId);
    }
}