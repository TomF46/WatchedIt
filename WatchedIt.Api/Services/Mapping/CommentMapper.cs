using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.CommentModels;

namespace WatchedIt.Api.Services.Mapping
{
    public static class CommentMapper
    {
        public static GetReviewCommentDto MapReviewComment(ReviewComment comment){
            return new GetReviewCommentDto {
                Id = comment.Id,
                Text = comment.Text,
                ReviewId = comment.Review.Id,
                User = UserMapper.Map(comment.User),
                CreatedDate = comment.CreatedDate,
                UpdatedDate = comment.UpdatedDate
            };
        }
    }
}