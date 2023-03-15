using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WatchedIt.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddPersonAndCredits2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Credit_Films_FilmId",
                table: "Credit");

            migrationBuilder.DropForeignKey(
                name: "FK_Credit_Person_PersonId",
                table: "Credit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Person",
                table: "Person");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Credit",
                table: "Credit");

            migrationBuilder.RenameTable(
                name: "Person",
                newName: "People");

            migrationBuilder.RenameTable(
                name: "Credit",
                newName: "Credits");

            migrationBuilder.RenameIndex(
                name: "IX_Credit_PersonId",
                table: "Credits",
                newName: "IX_Credits_PersonId");

            migrationBuilder.RenameIndex(
                name: "IX_Credit_FilmId",
                table: "Credits",
                newName: "IX_Credits_FilmId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_People",
                table: "People",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Credits",
                table: "Credits",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Credits_Films_FilmId",
                table: "Credits",
                column: "FilmId",
                principalTable: "Films",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Credits_People_PersonId",
                table: "Credits",
                column: "PersonId",
                principalTable: "People",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Credits_Films_FilmId",
                table: "Credits");

            migrationBuilder.DropForeignKey(
                name: "FK_Credits_People_PersonId",
                table: "Credits");

            migrationBuilder.DropPrimaryKey(
                name: "PK_People",
                table: "People");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Credits",
                table: "Credits");

            migrationBuilder.RenameTable(
                name: "People",
                newName: "Person");

            migrationBuilder.RenameTable(
                name: "Credits",
                newName: "Credit");

            migrationBuilder.RenameIndex(
                name: "IX_Credits_PersonId",
                table: "Credit",
                newName: "IX_Credit_PersonId");

            migrationBuilder.RenameIndex(
                name: "IX_Credits_FilmId",
                table: "Credit",
                newName: "IX_Credit_FilmId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Person",
                table: "Person",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Credit",
                table: "Credit",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Credit_Films_FilmId",
                table: "Credit",
                column: "FilmId",
                principalTable: "Films",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Credit_Person_PersonId",
                table: "Credit",
                column: "PersonId",
                principalTable: "Person",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
