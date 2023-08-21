using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WatchedIt.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddConnectionsGamesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConnectionsGames",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    PersonId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreditId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConnectionsGames", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConnectionsGames_Credits_CreditId",
                        column: x => x.CreditId,
                        principalTable: "Credits",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ConnectionsGames_People_PersonId",
                        column: x => x.PersonId,
                        principalTable: "People",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ConnectionsGames_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ConnectionsGameClue",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreditId = table.Column<int>(type: "int", nullable: false),
                    ConnectionsGameId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConnectionsGameClue", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ConnectionsGameClue_ConnectionsGames_ConnectionsGameId",
                        column: x => x.ConnectionsGameId,
                        principalTable: "ConnectionsGames",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ConnectionsGameClue_Credits_CreditId",
                        column: x => x.CreditId,
                        principalTable: "Credits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConnectionsGameClue_ConnectionsGameId",
                table: "ConnectionsGameClue",
                column: "ConnectionsGameId");

            migrationBuilder.CreateIndex(
                name: "IX_ConnectionsGameClue_CreditId",
                table: "ConnectionsGameClue",
                column: "CreditId");

            migrationBuilder.CreateIndex(
                name: "IX_ConnectionsGames_CreditId",
                table: "ConnectionsGames",
                column: "CreditId");

            migrationBuilder.CreateIndex(
                name: "IX_ConnectionsGames_PersonId",
                table: "ConnectionsGames",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_ConnectionsGames_UserId",
                table: "ConnectionsGames",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConnectionsGameClue");

            migrationBuilder.DropTable(
                name: "ConnectionsGames");
        }
    }
}
