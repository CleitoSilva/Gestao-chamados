using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class UserEntityMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    id_user = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
                    user_name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    email = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    password = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    id_enterprise = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    user_create = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    user_update = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    updated_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.id_user);
                    table.ForeignKey(
                        name: "FK_user_enterprise_id_enterprise",
                        column: x => x.id_enterprise,
                        principalTable: "enterprise",
                        principalColumn: "id_enterprise",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_Created_Date",
                table: "user",
                column: "created_date");

            migrationBuilder.CreateIndex(
                name: "IX_User_Email",
                table: "user",
                column: "email");

            migrationBuilder.CreateIndex(
                name: "IX_user_id_enterprise",
                table: "user",
                column: "id_enterprise");

            migrationBuilder.CreateIndex(
                name: "IX_User_UserName",
                table: "user",
                column: "user_name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
