using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class CreateComponentEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "component",
                columns: table => new
                {
                    id_component = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    description = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    id_machine = table.Column<int>(type: "int", nullable: false),
                    id_enterprise = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    user_create = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    user_update = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    updated_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_component", x => x.id_component);
                    table.ForeignKey(
                        name: "FK_component_enterprise_id_enterprise",
                        column: x => x.id_enterprise,
                        principalTable: "enterprise",
                        principalColumn: "id_enterprise");
                    table.ForeignKey(
                        name: "FK_component_machine_id_machine",
                        column: x => x.id_machine,
                        principalTable: "machine",
                        principalColumn: "id_machine",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Component_Created_Date",
                table: "component",
                column: "created_date");

            migrationBuilder.CreateIndex(
                name: "IX_Component_IdEnterprise",
                table: "component",
                column: "id_enterprise");

            migrationBuilder.CreateIndex(
                name: "IX_Component_IdMachine",
                table: "component",
                column: "id_machine");

            migrationBuilder.CreateIndex(
                name: "IX_Component_Name",
                table: "component",
                column: "name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "component");
        }
    }
}
