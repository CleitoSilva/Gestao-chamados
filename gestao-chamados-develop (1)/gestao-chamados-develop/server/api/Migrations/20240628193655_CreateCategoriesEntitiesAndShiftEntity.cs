using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class CreateCategoriesEntitiesAndShiftEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "colaborator_category",
                columns: table => new
                {
                    id_colaborator_category = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    description = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    type_category = table.Column<int>(type: "int", nullable: false),
                    id_enterprise = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    user_create = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    user_update = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    updated_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_colaborator_category", x => x.id_colaborator_category);
                    table.ForeignKey(
                        name: "FK_colaborator_category_enterprise_id_enterprise",
                        column: x => x.id_enterprise,
                        principalTable: "enterprise",
                        principalColumn: "id_enterprise",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "shift",
                columns: table => new
                {
                    id_shift = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    description = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    start_hour = table.Column<TimeSpan>(type: "time", nullable: false),
                    end_hour = table.Column<TimeSpan>(type: "time", nullable: false),
                    id_enterprise = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    user_create = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    user_update = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    updated_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_shift", x => x.id_shift);
                    table.ForeignKey(
                        name: "FK_shift_enterprise_id_enterprise",
                        column: x => x.id_enterprise,
                        principalTable: "enterprise",
                        principalColumn: "id_enterprise",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "technique_category",
                columns: table => new
                {
                    id_technique_category = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    description = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    type_category = table.Column<int>(type: "int", nullable: false),
                    id_area_location_cover = table.Column<int>(type: "int", nullable: false),
                    id_enterprise = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    user_create = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    user_update = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    updated_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_technique_category", x => x.id_technique_category);
                    table.ForeignKey(
                        name: "FK_technique_category_area_id_area_location_cover",
                        column: x => x.id_area_location_cover,
                        principalTable: "area",
                        principalColumn: "id_area",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_technique_category_enterprise_id_enterprise",
                        column: x => x.id_enterprise,
                        principalTable: "enterprise",
                        principalColumn: "id_enterprise");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Colaborator_Category_Created_Date",
                table: "colaborator_category",
                column: "created_date");

            migrationBuilder.CreateIndex(
                name: "IX_Colaborator_Category_IdEnterprise",
                table: "colaborator_category",
                column: "id_enterprise");

            migrationBuilder.CreateIndex(
                name: "IX_Colaborator_Category_Name",
                table: "colaborator_category",
                column: "name");

            migrationBuilder.CreateIndex(
                name: "IX_Colaborator_Category_TypeCategory",
                table: "colaborator_category",
                column: "type_category");

            migrationBuilder.CreateIndex(
                name: "IX_Colaborator_Category_Created_Date",
                table: "shift",
                column: "created_date");

            migrationBuilder.CreateIndex(
                name: "IX_Colaborator_Category_IdEnterprise",
                table: "shift",
                column: "id_enterprise");

            migrationBuilder.CreateIndex(
                name: "IX_Shift_EndHour",
                table: "shift",
                column: "end_hour");

            migrationBuilder.CreateIndex(
                name: "IX_Shift_StartHour",
                table: "shift",
                column: "start_hour");

            migrationBuilder.CreateIndex(
                name: "IX_Technique_Category_Created_Date",
                table: "technique_category",
                column: "created_date");

            migrationBuilder.CreateIndex(
                name: "IX_technique_category_id_area_location_cover",
                table: "technique_category",
                column: "id_area_location_cover");

            migrationBuilder.CreateIndex(
                name: "IX_Technique_Category_IdEnterprise",
                table: "technique_category",
                column: "id_enterprise");

            migrationBuilder.CreateIndex(
                name: "IX_Technique_Category_Name",
                table: "technique_category",
                column: "name");

            migrationBuilder.CreateIndex(
                name: "IX_Technique_Category_TypeCategory",
                table: "technique_category",
                column: "type_category");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "colaborator_category");

            migrationBuilder.DropTable(
                name: "shift");

            migrationBuilder.DropTable(
                name: "technique_category");
        }
    }
}
