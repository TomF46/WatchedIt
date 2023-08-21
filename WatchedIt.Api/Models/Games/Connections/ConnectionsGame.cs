using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.CreditModels;
using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Models.Games.Connections
{
    public class ConnectionsGame
    {
        public int Id {get;set;}
        [Required]
        public User? User {get; set;}
        [Required]
        public Person? Person {get; set;}
        public GameStatus Status {get; set;} = GameStatus.InProgress;
        public ICollection<ConnectionsGameClue> Clues { get; set; } = new List<ConnectionsGameClue>();
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }    
    }
}