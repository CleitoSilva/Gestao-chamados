using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class CreateTicketTechniqueEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ticket_technique",
                columns: table => new
                {
                    id_technique = table.Column<int>(type: "int", nullable: false),
                    id_ticket = table.Column<int>(type: "int", nullable: false),
                    service_status = table.Column<int>(type: "int", nullable: false),
                    user_create = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    user_update = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    updated_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ticket_technique", x => new { x.id_technique, x.id_ticket });
                    table.ForeignKey(
                        name: "FK_ticket_technique_technique_category_id_technique",
                        column: x => x.id_technique,
                        principalTable: "technique_category",
                        principalColumn: "id_technique_category",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ticket_technique_ticket_id_ticket",
                        column: x => x.id_ticket,
                        principalTable: "ticket",
                        principalColumn: "id_ticket");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TicketColaborator_Created_Date",
                table: "ticket_technique",
                column: "created_date");

            migrationBuilder.CreateIndex(
                name: "IX_TicketColaborator_IdTechniqueCategory",
                table: "ticket_technique",
                column: "id_technique");

            migrationBuilder.CreateIndex(
                name: "IX_TicketColaborator_IdTicket",
                table: "ticket_technique",
                column: "id_ticket");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ticket_technique");
        }
    }
}
