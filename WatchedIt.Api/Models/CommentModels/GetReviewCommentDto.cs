using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.CommentModels
{
    public class GetReviewCommentDto : GetCommentDto
    {
        public int ReviewId { get; set; }   
    }
}