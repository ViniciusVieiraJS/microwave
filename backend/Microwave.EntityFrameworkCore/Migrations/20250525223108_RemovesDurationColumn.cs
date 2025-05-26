using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Microwave.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class RemovesDurationColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "MicrowaveHeatings");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Duration",
                table: "MicrowaveHeatings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
