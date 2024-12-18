using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class CreateLineEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "line",
                columns: table => new
                {
                    id_line = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    number = table.Column<int>(type: "int", nullable: false),
                    description = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    id_area = table.Column<int>(type: "int", nullable: false),
                    id_subarea = table.Column<int>(type: "int", nullable: true),
                    id_enterprise = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    user_create = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    user_update = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    updated_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_line", x => x.id_line);
                    table.ForeignKey(
                        name: "FK_line_area_id_area",
                        column: x => x.id_area,
                        principalTable: "area",
                        principalColumn: "id_area",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_line_enterprise_id_enterprise",
                        column: x => x.id_enterprise,
                        principalTable: "enterprise",
                        principalColumn: "id_enterprise");
                    table.ForeignKey(
                        name: "FK_line_subarea_id_subarea",
                        column: x => x.id_subarea,
                        principalTable: "subarea",
                        principalColumn: "id_subarea");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Line_Area",
                table: "line",
                column: "id_area");

            migrationBuilder.CreateIndex(
                name: "IX_Line_Created_Date",
                table: "line",
                column: "created_date");

            migrationBuilder.CreateIndex(
                name: "IX_Line_Enterprise",
                table: "line",
                column: "id_enterprise");

            migrationBuilder.CreateIndex(
                name: "IX_Line_Name",
                table: "line",
                column: "name");

            migrationBuilder.CreateIndex(
                name: "IX_Line_SubArea",
                table: "line",
                column: "id_subarea");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "line");
        }
    }
}
