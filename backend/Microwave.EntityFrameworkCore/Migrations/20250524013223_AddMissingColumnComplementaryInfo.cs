using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Microwave.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class AddMissingColumnComplementaryInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ComplementaryInformation",
                table: "HeatingPrograms",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ComplementaryInformation",
                table: "HeatingPrograms");
        }
    }
}
