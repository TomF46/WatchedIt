using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WatchedIt.Api.Models.CommentModels;

namespace WatchedIt.Api.Data.Configuration
{
    public class ReviewCommentConfiguration : IEntityTypeConfiguration<ReviewComment>
    {
        public void Configure(EntityTypeBuilder<ReviewComment> builder)
        {
            builder
            .HasOne(e => e.User)
            .WithMany()
            .OnDelete(DeleteBehavior.Restrict);
        }
    }
}