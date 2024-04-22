﻿// <auto-generated />
using System;
using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace WatchedIt.Api.Migrations
{
    [DbContext(typeof(WatchedItContext))]
    partial class WatchedItContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CategoryFilm", b =>
                {
                    b.Property<int>("CategoriesId")
                        .HasColumnType("int");

                    b.Property<int>("FilmsId")
                        .HasColumnType("int");

                    b.HasKey("CategoriesId", "FilmsId");

                    b.HasIndex("FilmsId");

                    b.ToTable("CategoryFilm");
                });

            modelBuilder.Entity("FilmFilmList", b =>
                {
                    b.Property<int>("FilmsId")
                        .HasColumnType("int");

                    b.Property<int>("OnListsId")
                        .HasColumnType("int");

                    b.HasKey("FilmsId", "OnListsId");

                    b.HasIndex("OnListsId");

                    b.ToTable("FilmFilmList");
                });

            modelBuilder.Entity("FilmUser", b =>
                {
                    b.Property<int>("WatchedById")
                        .HasColumnType("int");

                    b.Property<int>("WatchedId")
                        .HasColumnType("int");

                    b.HasKey("WatchedById", "WatchedId");

                    b.HasIndex("WatchedId");

                    b.ToTable("FilmUser");
                });

            modelBuilder.Entity("GuessFilmFromCastGamePerson", b =>
                {
                    b.Property<int>("CluesId")
                        .HasColumnType("int");

                    b.Property<int>("GamesUsedAsClueId")
                        .HasColumnType("int");

                    b.HasKey("CluesId", "GamesUsedAsClueId");

                    b.HasIndex("GamesUsedAsClueId");

                    b.ToTable("GuessFilmFromCastGamePerson");
                });

            modelBuilder.Entity("PersonUser", b =>
                {
                    b.Property<int>("LikedById")
                        .HasColumnType("int");

                    b.Property<int>("LikesId")
                        .HasColumnType("int");

                    b.HasKey("LikedById", "LikesId");

                    b.HasIndex("LikesId");

                    b.ToTable("PersonUser");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.Authentication.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Biography")
                        .HasMaxLength(400)
                        .HasColumnType("nvarchar(400)");

                    b.Property<bool>("CanPublish")
                        .HasColumnType("bit");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.CategoryModels.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.CommentModels.ReviewComment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .HasMaxLength(600)
                        .HasColumnType("datetime2");

                    b.Property<int>("ReviewId")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ReviewId");

                    b.HasIndex("UserId");

                    b.ToTable("ReviewComments");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.CreditModels.Credit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("FilmId")
                        .HasColumnType("int");

                    b.Property<int>("PersonId")
                        .HasColumnType("int");

                    b.Property<string>("Role")
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FilmId");

                    b.HasIndex("PersonId");

                    b.ToTable("Credits");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.Files.FilmImage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("FilmId")
                        .HasColumnType("int");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FilmId");

                    b.ToTable("FilmImage");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.FilmListModels.FilmList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CreatedById")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasMaxLength(400)
                        .HasColumnType("nvarchar(400)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.ToTable("FilmLists");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.FilmModels.Film", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<double?>("AverageRating")
                        .HasColumnType("float");

                    b.Property<string>("FullDescription")
                        .HasMaxLength(800)
                        .HasColumnType("nvarchar(800)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(60)
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("PosterUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ReleaseDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Runtime")
                        .HasColumnType("int");

                    b.Property<string>("ShortDescription")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("TrailerUrl")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Films");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.FilmTrivia.FilmTrivia", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("FilmId")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("nvarchar(1000)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FilmId");

                    b.HasIndex("UserId");

                    b.ToTable("FilmTrivias");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.Games.Connections.ConnectionsGame", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("PersonId")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PersonId");

                    b.HasIndex("UserId");

                    b.ToTable("ConnectionsGames");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.Games.Connections.ConnectionsGameClue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("ConnectionsGameId")
                        .HasColumnType("int");

                    b.Property<int>("CreditId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ConnectionsGameId");

                    b.HasIndex("CreditId");

                    b.ToTable("ConnectionsGameClue");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.Games.GuessFilmFromCast.GuessFilmFromCastGame", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("FilmId")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FilmId");

                    b.HasIndex("UserId");

                    b.ToTable("GuessFilmFromCastGames");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.Games.GuessFilmFromDescription.GuessFilmFromDescriptionGame", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("GuessFilmFromDescriptionGames");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.Games.GuessFilmFromDescription.GuessFilmFromDescriptionRound", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("FilmId")
                        .HasColumnType("int");

                    b.Property<int?>("GuessFilmFromDescriptionGameId")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FilmId");

                    b.HasIndex("GuessFilmFromDescriptionGameId");

                    b.ToTable("GuessFilmFromDescriptionRound");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.News.NewsArticle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Content")
                        .HasMaxLength(8000)
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("Published")
                        .HasColumnType("bit");

                    b.Property<string>("ThumbnailUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasMaxLength(80)
                        .HasColumnType("nvarchar(80)");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("NewsArticles");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.NotificationModels.Notification", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Read")
                        .HasColumnType("bit");

                    b.Property<int>("RecipientId")
                        .HasColumnType("int");

                    b.Property<DateTime>("SentDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RecipientId");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.PersonModels.Person", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasMaxLength(800)
                        .HasColumnType("nvarchar(800)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("MiddleNames")
                        .HasMaxLength(80)
                        .HasColumnType("nvarchar(80)");

                    b.Property<string>("StageName")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("People");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.ReviewModels.Review", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("FilmId")
                        .HasColumnType("int");

                    b.Property<double>("Rating")
                        .HasColumnType("float");

                    b.Property<string>("Text")
                        .HasMaxLength(8000)
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FilmId");

                    b.HasIndex("UserId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("CategoryFilm", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.CategoryModels.Category", null)
                        .WithMany()
                        .HasForeignKey("CategoriesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WatchedIt.Api.Models.FilmModels.Film", null)
                        .WithMany()
                        .HasForeignKey("FilmsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FilmFilmList", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.FilmModels.Film", null)
                        .WithMany()
                        .HasForeignKey("FilmsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WatchedIt.Api.Models.FilmListModels.FilmList", null)
                        .WithMany()
                        .HasForeignKey("OnListsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("FilmUser", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.Authentication.User", null)
                        .WithMany()
                        .HasForeignKey("WatchedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WatchedIt.Api.Models.FilmModels.Film", null)
                        .WithMany()
                        .HasForeignKey("WatchedId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("GuessFilmFromCastGamePerson", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.PersonModels.Person", null)
                        .WithMany()
                        .HasForeignKey("CluesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WatchedIt.Api.Models.Games.GuessFilmFromCast.GuessFilmFromCastGame", null)
                        .WithMany()
                        .HasForeignKey("GamesUsedAsClueId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("PersonUser", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.Authentication.User", null)
                        .WithMany()
                        .HasForeignKey("LikedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WatchedIt.Api.Models.PersonModels.Person", null)
                        .WithMany()
                        .HasForeignKey("LikesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WatchedIt.Api.Models.CommentModels.ReviewComment", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.ReviewModels.Review", "Review")
                        .WithMany("Comments")
                        .HasForeignKey("ReviewId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WatchedIt.Api.Models.Authentication.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Review");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.CreditModels.Credit", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.FilmModels.Film", "Film")
                        .WithMany("Credits")
                        .HasForeignKey("FilmId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WatchedIt.Api.Models.PersonModels.Person", "Person")
                        .WithMany("Credits")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Film");

                    b.Navigation("Person");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.Files.FilmImage", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.FilmModels.Film", "Film")
                        .WithMany("Images")
                        .HasForeignKey("FilmId");

                    b.Navigation("Film");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.FilmListModels.FilmList", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.Authentication.User", "CreatedBy")
                        .WithMany("Lists")
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreatedBy");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.FilmTrivia.FilmTrivia", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.FilmModels.Film", "Film")
                        .WithMany()
                        .HasForeignKey("FilmId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WatchedIt.Api.Models.Authentication.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("Film");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.Games.Connections.ConnectionsGame", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.PersonModels.Person", "Person")
                        .WithMany()
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WatchedIt.Api.Models.Authentication.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Person");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.Games.Connections.ConnectionsGameClue", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.Games.Connections.ConnectionsGame", null)
                        .WithMany("Clues")
                        .HasForeignKey("ConnectionsGameId");

                    b.HasOne("WatchedIt.Api.Models.CreditModels.Credit", "Credit")
                        .WithMany()
                        .HasForeignKey("CreditId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Credit");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.Games.GuessFilmFromCast.GuessFilmFromCastGame", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.FilmModels.Film", "Film")
                        .WithMany()
                        .HasForeignKey("FilmId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WatchedIt.Api.Models.Authentication.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Film");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.Games.GuessFilmFromDescription.GuessFilmFromDescriptionGame", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.Authentication.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.Games.GuessFilmFromDescription.GuessFilmFromDescriptionRound", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.FilmModels.Film", "Film")
                        .WithMany()
                        .HasForeignKey("FilmId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WatchedIt.Api.Models.Games.GuessFilmFromDescription.GuessFilmFromDescriptionGame", null)
                        .WithMany("Rounds")
                        .HasForeignKey("GuessFilmFromDescriptionGameId");

                    b.Navigation("Film");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.News.NewsArticle", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.Authentication.User", "User")
                        .WithMany("Articles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.NotificationModels.Notification", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.Authentication.User", "Recipient")
                        .WithMany("Notifications")
                        .HasForeignKey("RecipientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Recipient");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.ReviewModels.Review", b =>
                {
                    b.HasOne("WatchedIt.Api.Models.FilmModels.Film", "Film")
                        .WithMany("Reviews")
                        .HasForeignKey("FilmId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WatchedIt.Api.Models.Authentication.User", "User")
                        .WithMany("Reviews")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Film");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.Authentication.User", b =>
                {
                    b.Navigation("Articles");

                    b.Navigation("Lists");

                    b.Navigation("Notifications");

                    b.Navigation("Reviews");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.FilmModels.Film", b =>
                {
                    b.Navigation("Credits");

                    b.Navigation("Images");

                    b.Navigation("Reviews");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.Games.Connections.ConnectionsGame", b =>
                {
                    b.Navigation("Clues");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.Games.GuessFilmFromDescription.GuessFilmFromDescriptionGame", b =>
                {
                    b.Navigation("Rounds");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.PersonModels.Person", b =>
                {
                    b.Navigation("Credits");
                });

            modelBuilder.Entity("WatchedIt.Api.Models.ReviewModels.Review", b =>
                {
                    b.Navigation("Comments");
                });
#pragma warning restore 612, 618
        }
    }
}
