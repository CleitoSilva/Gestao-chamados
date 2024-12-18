using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ChangeAreaLocationTechniqueEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_technique_category_area_id_area_location_cover",
                table: "technique_category");

            migrationBuilder.DropForeignKey(
                name: "FK_technique_category_enterprise_id_enterprise",
                table: "technique_category");

            migrationBuilder.AlterColumn<int>(
                name: "id_area_location_cover",
                table: "technique_category",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "id_technique_category",
                table: "colaborator",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_technique_category_area_id_area_location_cover",
                table: "technique_category",
                column: "id_area_location_cover",
                principalTable: "area",
                principalColumn: "id_area");

            migrationBuilder.AddForeignKey(
                name: "FK_technique_category_enterprise_id_enterprise",
                table: "technique_category",
                column: "id_enterprise",
                principalTable: "enterprise",
                principalColumn: "id_enterprise",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_technique_category_area_id_area_location_cover",
                table: "technique_category");

            migrationBuilder.DropForeignKey(
                name: "FK_technique_category_enterprise_id_enterprise",
                table: "technique_category");

            migrationBuilder.AlterColumn<int>(
                name: "id_area_location_cover",
                table: "technique_category",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "id_technique_category",
                table: "colaborator",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_technique_category_area_id_area_location_cover",
                table: "technique_category",
                column: "id_area_location_cover",
                principalTable: "area",
                principalColumn: "id_area",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_technique_category_enterprise_id_enterprise",
                table: "technique_category",
                column: "id_enterprise",
                principalTable: "enterprise",
                principalColumn: "id_enterprise");
        }
    }
}
