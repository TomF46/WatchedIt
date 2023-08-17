using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WatchedIt.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddScoreToGuessDescGame : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Score",
                table: "GuessFilmFromDescriptionGames",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Score",
                table: "GuessFilmFromDescriptionGames");
        }
    }
}
