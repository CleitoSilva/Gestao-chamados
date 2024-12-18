using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class NullableTechentity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_technique_category_area_id_area_location_cover",
                table: "technique_category");

            migrationBuilder.AddForeignKey(
                name: "FK_technique_category_area_id_area_location_cover",
                table: "technique_category",
                column: "id_area_location_cover",
                principalTable: "area",
                principalColumn: "id_area");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_technique_category_area_id_area_location_cover",
                table: "technique_category");

            migrationBuilder.AddForeignKey(
                name: "FK_technique_category_area_id_area_location_cover",
                table: "technique_category",
                column: "id_area_location_cover",
                principalTable: "area",
                principalColumn: "id_area",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
