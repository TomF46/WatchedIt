using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WatchedIt.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddWatchedColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FilmPerson",
                columns: table => new
                {
                    WatchedById = table.Column<int>(type: "int", nullable: false),
                    WatchedId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilmPerson", x => new { x.WatchedById, x.WatchedId });
                    table.ForeignKey(
                        name: "FK_FilmPerson_Films_WatchedId",
                        column: x => x.WatchedId,
                        principalTable: "Films",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FilmPerson_People_WatchedById",
                        column: x => x.WatchedById,
                        principalTable: "People",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FilmPerson_WatchedId",
                table: "FilmPerson",
                column: "WatchedId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FilmPerson");
        }
    }
}
