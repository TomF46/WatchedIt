using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.UserModels;

namespace WatchedIt.Api.Models.Games.GuessFilmFromDescription
{
    public class GetGuessFilmFromDescriptionLeaderboardEntryDto
    {
        public int Id {get; set;}
        public int Score {get; set;}
        public GetSimpleUserDto User {get; set;}
        public DateTime UpdatedDate { get; set; }    

    }
}