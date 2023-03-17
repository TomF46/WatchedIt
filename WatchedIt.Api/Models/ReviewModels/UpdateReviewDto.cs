using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WatchedIt.Api.Models.ReviewModels
{
    public class UpdateReviewDto
    {
        public int Rating {get;set;}
        public string? Text {get;set;}
    }
}