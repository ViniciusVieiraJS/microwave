using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Microwave.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class AddMicrowaveEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MicrowaveHeatings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PowerLevel = table.Column<int>(type: "int", nullable: false),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    TimeInSeconds = table.Column<int>(type: "int", nullable: false),
                    InHeating = table.Column<bool>(type: "bit", nullable: false),
                    IsPaused = table.Column<bool>(type: "bit", nullable: false),
                    TimeHasStarted = table.Column<bool>(type: "bit", nullable: false),
                    FromPreDefinedProgram = table.Column<bool>(type: "bit", nullable: false),
                    HeatingCharacter = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HeatingString = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FormattedSeconds = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CurrentInput = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MicrowaveHeatings", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MicrowaveHeatings");
        }
    }
}
