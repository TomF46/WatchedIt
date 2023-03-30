using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WatchedIt.Api.Models.ReviewModels;

namespace WatchedIt.Api.Services.Mapping
{
    public static class ReviewMapper
    {
        public static GetReviewDto Map(Review review, int userId){
            return new GetReviewDto{
                Id = review.Id,
                User = UserMapper.Map(review.User),
                Film = FilmMapper.MapSimple(review.Film),
                Rating = review.Rating,
                Text = review.Text,
                userCanEdit = review.User.Id == userId
            };
        }

        public static GetReviewOverviewDto MapOverview(Review review){
            return new GetReviewOverviewDto{
                Id = review.Id,
                User = UserMapper.Map(review.User),
                Film = FilmMapper.MapSimple(review.Film),
                Rating = review.Rating,
                Text = review.Text
            };
        }
    }
}