using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class CreateTicketEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ticket",
                columns: table => new
                {
                    id_ticket = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    total_ticket_time = table.Column<double>(type: "float", nullable: false),
                    total_waiting_time = table.Column<double>(type: "float", nullable: false),
                    total_service_time = table.Column<double>(type: "float", nullable: false),
                    status = table.Column<int>(type: "int", nullable: false),
                    id_open_colaborator = table.Column<int>(type: "int", nullable: true),
                    id_responsible_manutentor = table.Column<int>(type: "int", nullable: true),
                    id_area = table.Column<int>(type: "int", nullable: true),
                    id_subarea = table.Column<int>(type: "int", nullable: true),
                    id_line = table.Column<int>(type: "int", nullable: true),
                    id_machine = table.Column<int>(type: "int", nullable: true),
                    id_component = table.Column<int>(type: "int", nullable: true),
                    id_technique_category = table.Column<int>(type: "int", nullable: true),
                    id_enterprise = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    user_create = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    user_update = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    updated_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ticket", x => x.id_ticket);
                    table.ForeignKey(
                        name: "FK_ticket_area_id_area",
                        column: x => x.id_area,
                        principalTable: "area",
                        principalColumn: "id_area");
                    table.ForeignKey(
                        name: "FK_ticket_colaborator_id_open_colaborator",
                        column: x => x.id_open_colaborator,
                        principalTable: "colaborator",
                        principalColumn: "id_colaborator");
                    table.ForeignKey(
                        name: "FK_ticket_colaborator_id_responsible_manutentor",
                        column: x => x.id_responsible_manutentor,
                        principalTable: "colaborator",
                        principalColumn: "id_colaborator");
                    table.ForeignKey(
                        name: "FK_ticket_component_id_component",
                        column: x => x.id_component,
                        principalTable: "component",
                        principalColumn: "id_component");
                    table.ForeignKey(
                        name: "FK_ticket_enterprise_id_enterprise",
                        column: x => x.id_enterprise,
                        principalTable: "enterprise",
                        principalColumn: "id_enterprise",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ticket_line_id_line",
                        column: x => x.id_line,
                        principalTable: "line",
                        principalColumn: "id_line");
                    table.ForeignKey(
                        name: "FK_ticket_machine_id_machine",
                        column: x => x.id_machine,
                        principalTable: "machine",
                        principalColumn: "id_machine");
                    table.ForeignKey(
                        name: "FK_ticket_subarea_id_subarea",
                        column: x => x.id_subarea,
                        principalTable: "subarea",
                        principalColumn: "id_subarea");
                    table.ForeignKey(
                        name: "FK_ticket_technique_category_id_technique_category",
                        column: x => x.id_technique_category,
                        principalTable: "technique_category",
                        principalColumn: "id_technique_category");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_Created_Date",
                table: "ticket",
                column: "created_date");

            migrationBuilder.CreateIndex(
                name: "IX_ticket_id_area",
                table: "ticket",
                column: "id_area");

            migrationBuilder.CreateIndex(
                name: "IX_ticket_id_component",
                table: "ticket",
                column: "id_component");

            migrationBuilder.CreateIndex(
                name: "IX_ticket_id_line",
                table: "ticket",
                column: "id_line");

            migrationBuilder.CreateIndex(
                name: "IX_ticket_id_machine",
                table: "ticket",
                column: "id_machine");

            migrationBuilder.CreateIndex(
                name: "IX_ticket_id_open_colaborator",
                table: "ticket",
                column: "id_open_colaborator");

            migrationBuilder.CreateIndex(
                name: "IX_ticket_id_responsible_manutentor",
                table: "ticket",
                column: "id_responsible_manutentor");

            migrationBuilder.CreateIndex(
                name: "IX_ticket_id_subarea",
                table: "ticket",
                column: "id_subarea");

            migrationBuilder.CreateIndex(
                name: "IX_ticket_id_technique_category",
                table: "ticket",
                column: "id_technique_category");

            migrationBuilder.CreateIndex(
                name: "IX_Ticket_IdEnterprise",
                table: "ticket",
                column: "id_enterprise");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ticket");
        }
    }
}
