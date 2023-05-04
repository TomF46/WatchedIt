using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.UserModels;

namespace WatchedIt.Api.Models.CommentModels
{
    public class GetCommentDto
    {
        public int Id {get;set;}
        public string? Text {get;set;}
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }    
        public GetUserDto? User {get; set;}
    }
}