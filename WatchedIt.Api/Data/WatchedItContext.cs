using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore.Diagnostics;

using WatchedIt.Api.Data.Configuration;
using WatchedIt.Api.Models.Authentication;
using WatchedIt.Api.Models.CategoryModels;
using WatchedIt.Api.Models.CommentModels;
using WatchedIt.Api.Models.CreditModels;
using WatchedIt.Api.Models.Files;
using WatchedIt.Api.Models.FilmListModels;
using WatchedIt.Api.Models.FilmModels;
using WatchedIt.Api.Models.FilmTrivia;
using WatchedIt.Api.Models.Games.Connections;
using WatchedIt.Api.Models.Games.GuessFilmFromCast;
using WatchedIt.Api.Models.Games.GuessFilmFromDescription;
using WatchedIt.Api.Models.News;
using WatchedIt.Api.Models.NotificationModels;
using WatchedIt.Api.Models.PersonModels;
using WatchedIt.Api.Models.ReviewModels;
using WatchedIt.Api.Models.TagModels;

namespace Data
{
    public class WatchedItContext : DbContext
    {
        public WatchedItContext(DbContextOptions<WatchedItContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CreditConfiguration());
            modelBuilder.ApplyConfiguration(new ReviewCommentConfiguration());
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
       => optionsBuilder
       .ConfigureWarnings(warnings => warnings.Ignore(CoreEventId.NavigationBaseIncludeIgnored, CoreEventId.NavigationBaseIncluded));

        public DbSet<User> Users => Set<User>();
        public DbSet<Film> Films => Set<Film>();
        public DbSet<Person> People => Set<Person>();
        public DbSet<Credit> Credits => Set<Credit>();
        public DbSet<Review> Reviews => Set<Review>();
        public DbSet<FilmList> FilmLists => Set<FilmList>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<ReviewComment> ReviewComments => Set<ReviewComment>();
        public DbSet<Notification> Notifications => Set<Notification>();
        public DbSet<FilmTrivia> FilmTrivias => Set<FilmTrivia>();
        public DbSet<GuessFilmFromCastGame> GuessFilmFromCastGames => Set<GuessFilmFromCastGame>();
        public DbSet<GuessFilmFromDescriptionGame> GuessFilmFromDescriptionGames => Set<GuessFilmFromDescriptionGame>();
        public DbSet<ConnectionsGame> ConnectionsGames => Set<ConnectionsGame>();
        public DbSet<NewsArticle> NewsArticles => Set<NewsArticle>();
        public DbSet<FilmImage> FilmImages => Set<FilmImage>();
        public DbSet<PersonImage> PersonImages => Set<PersonImage>();
        public DbSet<Tag> Tags => Set<Tag>();




    }
}