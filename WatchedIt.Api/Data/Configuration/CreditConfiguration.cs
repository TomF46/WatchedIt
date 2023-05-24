using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WatchedIt.Api.Models.CreditModels;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;

namespace WatchedIt.Api.Data.Configuration
{
    public class CreditConfiguration : IEntityTypeConfiguration<Credit>
    {
        public void Configure(EntityTypeBuilder<Credit> modelBuilder)
        {
            modelBuilder.HasOne<Film>(gr => gr.Film)
            .WithMany(g => g.Credits)
            .HasForeignKey(gr => gr.FilmId);

            modelBuilder.HasOne<Person>(gr => gr.Person)
                .WithMany(f => f.Credits)
                .HasForeignKey(gr => gr.PersonId);
        }
    }
}