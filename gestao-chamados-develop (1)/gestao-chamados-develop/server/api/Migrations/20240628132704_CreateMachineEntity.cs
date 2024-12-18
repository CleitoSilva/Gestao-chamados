﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class CreateMachineEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "machine",
                columns: table => new
                {
                    id_machine = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    description = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    order = table.Column<int>(type: "int", nullable: false),
                    id_line = table.Column<int>(type: "int", nullable: false),
                    id_enterprise = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    user_create = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    user_update = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    updated_date = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_machine", x => x.id_machine);
                    table.ForeignKey(
                        name: "FK_machine_enterprise_id_enterprise",
                        column: x => x.id_enterprise,
                        principalTable: "enterprise",
                        principalColumn: "id_enterprise");
                    table.ForeignKey(
                        name: "FK_machine_line_id_line",
                        column: x => x.id_line,
                        principalTable: "line",
                        principalColumn: "id_line",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Machine_Created_Date",
                table: "machine",
                column: "created_date");

            migrationBuilder.CreateIndex(
                name: "IX_Machine_IdEnterprise",
                table: "machine",
                column: "id_enterprise");

            migrationBuilder.CreateIndex(
                name: "IX_Machine_IdLine",
                table: "machine",
                column: "id_line");

            migrationBuilder.CreateIndex(
                name: "IX_Machine_Name",
                table: "machine",
                column: "name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "machine");
        }
    }
}
