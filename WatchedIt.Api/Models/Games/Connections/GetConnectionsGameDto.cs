using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using WatchedIt.Api.Models.CreditModels;
using WatchedIt.Api.Models.Enums;
using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Models.Games.Connections
{
    public class GetConnectionsGameDto
    {
        public int Id {get; set;}
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }    
        public ICollection<GetCreditDto> Clues { get; set; } = new List<GetCreditDto>();
        public GetSimplePersonDto? Person {get; set;} // Null unless user has correctly guessed
        public GameStatus Status {get; set;}
        public string StatusText {get; set;}
    }
}