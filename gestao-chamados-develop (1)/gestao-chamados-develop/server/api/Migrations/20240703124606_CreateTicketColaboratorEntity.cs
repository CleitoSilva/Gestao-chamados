using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class CreateTicketColaboratorEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ticket_colaborator",
                columns: table => new
                {
                    id_colaborator = table.Column<int>(type: "int", nullable: false),
                    id_ticket = table.Column<int>(type: "int", nullable: false),
                    user_create = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    user_update = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    updated_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ticket_colaborator", x => new { x.id_colaborator, x.id_ticket });
                    table.ForeignKey(
                        name: "FK_ticket_colaborator_colaborator_id_colaborator",
                        column: x => x.id_colaborator,
                        principalTable: "colaborator",
                        principalColumn: "id_colaborator",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ticket_colaborator_ticket_id_ticket",
                        column: x => x.id_ticket,
                        principalTable: "ticket",
                        principalColumn: "id_ticket");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TicketColaborator_Created_Date",
                table: "ticket_colaborator",
                column: "created_date");

            migrationBuilder.CreateIndex(
                name: "IX_TicketColaborator_IdColaborator",
                table: "ticket_colaborator",
                column: "id_colaborator");

            migrationBuilder.CreateIndex(
                name: "IX_TicketColaborator_IdTicket",
                table: "ticket_colaborator",
                column: "id_ticket");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ticket_colaborator");
        }
    }
}
