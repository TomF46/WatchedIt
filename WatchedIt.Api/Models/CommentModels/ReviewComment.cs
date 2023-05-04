using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.ReviewModels;

namespace WatchedIt.Api.Models.CommentModels
{
    public class ReviewComment : Comment
    {
        [Required]
        public Review? Review {get; set;}
    }
}