using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.CreditModels;

namespace WatchedIt.Api.Models.Games.Connections
{
    public class ConnectionsGameClue
    {
        public int Id {get; set;}
        [Required]
        public Credit? Credit {get; set;}
    }
}