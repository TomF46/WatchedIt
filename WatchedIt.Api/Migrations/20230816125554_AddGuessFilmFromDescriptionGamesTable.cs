using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WatchedIt.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddGuessFilmFromDescriptionGamesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GuessFilmFromDescriptionGames",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuessFilmFromDescriptionGames", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GuessFilmFromDescriptionGames_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GuessFilmFromDescriptionRound",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FilmId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    GuessFilmFromDescriptionGameId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuessFilmFromDescriptionRound", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GuessFilmFromDescriptionRound_Films_FilmId",
                        column: x => x.FilmId,
                        principalTable: "Films",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GuessFilmFromDescriptionRound_GuessFilmFromDescriptionGames_GuessFilmFromDescriptionGameId",
                        column: x => x.GuessFilmFromDescriptionGameId,
                        principalTable: "GuessFilmFromDescriptionGames",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_GuessFilmFromDescriptionGames_UserId",
                table: "GuessFilmFromDescriptionGames",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_GuessFilmFromDescriptionRound_FilmId",
                table: "GuessFilmFromDescriptionRound",
                column: "FilmId");

            migrationBuilder.CreateIndex(
                name: "IX_GuessFilmFromDescriptionRound_GuessFilmFromDescriptionGameId",
                table: "GuessFilmFromDescriptionRound",
                column: "GuessFilmFromDescriptionGameId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GuessFilmFromDescriptionRound");

            migrationBuilder.DropTable(
                name: "GuessFilmFromDescriptionGames");
        }
    }
}
