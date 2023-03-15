using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Diagnostics;
using WatchedIt.Api.Models.CreditModels;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.PersonModels;

namespace Data
{
    public class WatchedItContext : DbContext
    {
        public WatchedItContext(DbContextOptions<WatchedItContext> options) : base(options)
        {
            
        }

         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Credit>()
            .HasOne<Film>(gr => gr.Film)
            .WithMany(g => g.Credits)
            .HasForeignKey(gr => gr.FilmId);

            modelBuilder.Entity<Credit>()
                .HasOne<Person>(gr => gr.Person)
                .WithMany(f => f.Credits)
                .HasForeignKey(gr => gr.PersonId);
        }

         protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder
        .ConfigureWarnings(warnings => warnings.Ignore(CoreEventId.NavigationBaseIncludeIgnored, CoreEventId.NavigationBaseIncluded));


        public DbSet<Film> Films => Set<Film>();
        public DbSet<Person> People => Set<Person>();
        public DbSet<Credit> Credits => Set<Credit>();

    }
}