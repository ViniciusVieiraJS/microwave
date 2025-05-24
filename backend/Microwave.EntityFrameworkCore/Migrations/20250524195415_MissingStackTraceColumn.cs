using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Microwave.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class MissingStackTraceColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StackTrace",
                table: "Logs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StackTrace",
                table: "Logs");
        }
    }
}
