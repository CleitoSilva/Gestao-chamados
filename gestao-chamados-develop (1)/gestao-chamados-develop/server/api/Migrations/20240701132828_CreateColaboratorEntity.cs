using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class CreateColaboratorEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "colaborator",
                columns: table => new
                {
                    id_colaborator = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    badge_card_number = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    rfid_card_number = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    re_number = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    id_colaborator_category = table.Column<int>(type: "int", nullable: true),
                    id_technique_category = table.Column<int>(type: "int", nullable: true),
                    id_shift = table.Column<int>(type: "int", nullable: true),
                    id_line = table.Column<int>(type: "int", nullable: true),
                    id_enterprise = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    user_create = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    user_update = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    updated_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_colaborator", x => x.id_colaborator);
                    table.ForeignKey(
                        name: "FK_colaborator_colaborator_category_id_colaborator_category",
                        column: x => x.id_colaborator_category,
                        principalTable: "colaborator_category",
                        principalColumn: "id_colaborator_category");
                    table.ForeignKey(
                        name: "FK_colaborator_enterprise_id_enterprise",
                        column: x => x.id_enterprise,
                        principalTable: "enterprise",
                        principalColumn: "id_enterprise",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_colaborator_line_id_line",
                        column: x => x.id_line,
                        principalTable: "line",
                        principalColumn: "id_line");
                    table.ForeignKey(
                        name: "FK_colaborator_shift_id_shift",
                        column: x => x.id_shift,
                        principalTable: "shift",
                        principalColumn: "id_shift");
                    table.ForeignKey(
                        name: "FK_colaborator_technique_category_id_technique_category",
                        column: x => x.id_technique_category,
                        principalTable: "technique_category",
                        principalColumn: "id_technique_category");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Colaborator_Created_Date",
                table: "colaborator",
                column: "created_date");

            migrationBuilder.CreateIndex(
                name: "IX_Colaborator_IdColaboratorCategory",
                table: "colaborator",
                column: "id_colaborator_category");

            migrationBuilder.CreateIndex(
                name: "IX_Colaborator_IdEnterprise",
                table: "colaborator",
                column: "id_enterprise");

            migrationBuilder.CreateIndex(
                name: "IX_Colaborator_IdLine",
                table: "colaborator",
                column: "id_line");

            migrationBuilder.CreateIndex(
                name: "IX_Colaborator_IdShift",
                table: "colaborator",
                column: "id_shift");

            migrationBuilder.CreateIndex(
                name: "IX_Colaborator_IdTechniqueCategory",
                table: "colaborator",
                column: "id_technique_category");

            migrationBuilder.CreateIndex(
                name: "IX_Colaborator_Name",
                table: "colaborator",
                column: "name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "colaborator");
        }
    }
}
