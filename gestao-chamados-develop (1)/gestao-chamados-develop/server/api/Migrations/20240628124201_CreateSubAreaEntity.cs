using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class CreateSubAreaEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "subarea",
                columns: table => new
                {
                    id_subarea = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    description = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    id_area = table.Column<int>(type: "int", nullable: false),
                    id_enterprise = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    user_create = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    user_update = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    updated_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_subarea", x => x.id_subarea);
                    table.ForeignKey(
                        name: "FK_subarea_area_id_area",
                        column: x => x.id_area,
                        principalTable: "area",
                        principalColumn: "id_area",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_subarea_enterprise_id_enterprise",
                        column: x => x.id_enterprise,
                        principalTable: "enterprise",
                        principalColumn: "id_enterprise");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SubArea_Created_Date",
                table: "subarea",
                column: "created_date");

            migrationBuilder.CreateIndex(
                name: "IX_SubArea_IdArea",
                table: "subarea",
                column: "id_area");

            migrationBuilder.CreateIndex(
                name: "IX_SubArea_IdEnterprise",
                table: "subarea",
                column: "id_enterprise");

            migrationBuilder.CreateIndex(
                name: "IX_SubArea_Name",
                table: "subarea",
                column: "name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "subarea");
        }
    }
}
