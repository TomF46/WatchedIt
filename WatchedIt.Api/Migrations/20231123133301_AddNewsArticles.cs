using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WatchedIt.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddNewsArticles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ConnectionsGames_Credits_CreditId",
                table: "ConnectionsGames");

            migrationBuilder.DropIndex(
                name: "IX_ConnectionsGames_CreditId",
                table: "ConnectionsGames");

            migrationBuilder.DropColumn(
                name: "CreditId",
                table: "ConnectionsGames");

            migrationBuilder.AddColumn<bool>(
                name: "CanPublish",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "NewsArticles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", maxLength: 8000, nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Published = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewsArticles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NewsArticles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NewsArticles_UserId",
                table: "NewsArticles",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NewsArticles");

            migrationBuilder.DropColumn(
                name: "CanPublish",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "CreditId",
                table: "ConnectionsGames",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ConnectionsGames_CreditId",
                table: "ConnectionsGames",
                column: "CreditId");

            migrationBuilder.AddForeignKey(
                name: "FK_ConnectionsGames_Credits_CreditId",
                table: "ConnectionsGames",
                column: "CreditId",
                principalTable: "Credits",
                principalColumn: "Id");
        }
    }
}
