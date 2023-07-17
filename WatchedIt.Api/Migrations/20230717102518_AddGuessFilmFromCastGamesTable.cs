using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WatchedIt.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddGuessFilmFromCastGamesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GuessFilmFromCastGames",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    FilmId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuessFilmFromCastGames", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GuessFilmFromCastGames_Films_FilmId",
                        column: x => x.FilmId,
                        principalTable: "Films",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GuessFilmFromCastGames_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GuessFilmFromCastGamePerson",
                columns: table => new
                {
                    CluesId = table.Column<int>(type: "int", nullable: false),
                    GamesUsedAsClueId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuessFilmFromCastGamePerson", x => new { x.CluesId, x.GamesUsedAsClueId });
                    table.ForeignKey(
                        name: "FK_GuessFilmFromCastGamePerson_GuessFilmFromCastGames_GamesUsedAsClueId",
                        column: x => x.GamesUsedAsClueId,
                        principalTable: "GuessFilmFromCastGames",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GuessFilmFromCastGamePerson_People_CluesId",
                        column: x => x.CluesId,
                        principalTable: "People",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GuessFilmFromCastGamePerson_GamesUsedAsClueId",
                table: "GuessFilmFromCastGamePerson",
                column: "GamesUsedAsClueId");

            migrationBuilder.CreateIndex(
                name: "IX_GuessFilmFromCastGames_FilmId",
                table: "GuessFilmFromCastGames",
                column: "FilmId");

            migrationBuilder.CreateIndex(
                name: "IX_GuessFilmFromCastGames_UserId",
                table: "GuessFilmFromCastGames",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GuessFilmFromCastGamePerson");

            migrationBuilder.DropTable(
                name: "GuessFilmFromCastGames");
        }
    }
}
