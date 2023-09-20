using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactAspCrud.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Student",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    usn = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    stname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    course = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    branch = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    sem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    contact = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Student", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Student");
        }
    }
}
