﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using api.Contexts;

#nullable disable

namespace api.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240628132704_CreateMachineEntity")]
    partial class CreateMachineEntity
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.16")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("api.Models.Area", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id_area");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("created_date");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("nvarchar(75)")
                        .HasColumnName("description");

                    b.Property<Guid>("IdEnterprise")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("id_enterprise");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("name");

                    b.Property<DateTime?>("UpdatedDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("updated_date");

                    b.Property<string>("UserCreate")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("user_create");

                    b.Property<string>("UserUpdate")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("user_update");

                    b.HasKey("Id");

                    b.HasIndex(new[] { "CreatedDate" }, "IX_Area_Created_Date");

                    b.HasIndex(new[] { "IdEnterprise" }, "IX_Area_IdEnterprise");

                    b.HasIndex(new[] { "Name" }, "IX_Area_Name");

                    b.ToTable("area", (string)null);
                });

            modelBuilder.Entity("api.Models.Enterprise", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("id_enterprise")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("created_date");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("nvarchar(75)")
                        .HasColumnName("description");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("name");

                    b.Property<DateTime?>("UpdatedDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("updated_date");

                    b.Property<string>("UserCreate")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("user_create");

                    b.Property<string>("UserUpdate")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("user_update");

                    b.HasKey("Id");

                    b.HasIndex(new[] { "CreatedDate" }, "IX_Enterprise_Created_Date");

                    b.HasIndex(new[] { "Name" }, "IX_Enterprise_Name");

                    b.ToTable("enterprise", (string)null);
                });

            modelBuilder.Entity("api.Models.Line", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id_line");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("created_date");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("nvarchar(75)")
                        .HasColumnName("description");

                    b.Property<int>("IdArea")
                        .HasColumnType("int")
                        .HasColumnName("id_area");

                    b.Property<Guid?>("IdEnterprise")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("id_enterprise");

                    b.Property<int?>("IdSubArea")
                        .HasColumnType("int")
                        .HasColumnName("id_subarea");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("name");

                    b.Property<int>("Number")
                        .HasColumnType("int")
                        .HasColumnName("number");

                    b.Property<DateTime?>("UpdatedDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("updated_date");

                    b.Property<string>("UserCreate")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("user_create");

                    b.Property<string>("UserUpdate")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("user_update");

                    b.HasKey("Id");

                    b.HasIndex(new[] { "IdArea" }, "IX_Line_Area");

                    b.HasIndex(new[] { "CreatedDate" }, "IX_Line_Created_Date");

                    b.HasIndex(new[] { "IdEnterprise" }, "IX_Line_Enterprise");

                    b.HasIndex(new[] { "Name" }, "IX_Line_Name");

                    b.HasIndex(new[] { "IdSubArea" }, "IX_Line_SubArea");

                    b.ToTable("line", (string)null);
                });

            modelBuilder.Entity("api.Models.Machine", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id_machine");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("created_date");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("nvarchar(75)")
                        .HasColumnName("description");

                    b.Property<Guid?>("IdEnterprise")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("id_enterprise");

                    b.Property<int>("IdLine")
                        .HasColumnType("int")
                        .HasColumnName("id_line");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("name");

                    b.Property<int>("Order")
                        .HasColumnType("int")
                        .HasColumnName("order");

                    b.Property<DateTime?>("UpdatedDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("updated_date");

                    b.Property<string>("UserCreate")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("user_create");

                    b.Property<string>("UserUpdate")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("user_update");

                    b.HasKey("Id");

                    b.HasIndex(new[] { "CreatedDate" }, "IX_Machine_Created_Date");

                    b.HasIndex(new[] { "IdEnterprise" }, "IX_Machine_IdEnterprise");

                    b.HasIndex(new[] { "IdLine" }, "IX_Machine_IdLine");

                    b.HasIndex(new[] { "Name" }, "IX_Machine_Name");

                    b.ToTable("machine", (string)null);
                });

            modelBuilder.Entity("api.Models.SubArea", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id_subarea");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("created_date");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("nvarchar(75)")
                        .HasColumnName("description");

                    b.Property<int>("IdArea")
                        .HasColumnType("int")
                        .HasColumnName("id_area");

                    b.Property<Guid?>("IdEnterprise")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("id_enterprise");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("name");

                    b.Property<DateTime?>("UpdatedDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("updated_date");

                    b.Property<string>("UserCreate")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("user_create");

                    b.Property<string>("UserUpdate")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("user_update");

                    b.HasKey("Id");

                    b.HasIndex(new[] { "CreatedDate" }, "IX_SubArea_Created_Date");

                    b.HasIndex(new[] { "IdArea" }, "IX_SubArea_IdArea");

                    b.HasIndex(new[] { "IdEnterprise" }, "IX_SubArea_IdEnterprise");

                    b.HasIndex(new[] { "Name" }, "IX_SubArea_Name");

                    b.ToTable("subarea", (string)null);
                });

            modelBuilder.Entity("api.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("id_user")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("created_date");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(120)
                        .HasColumnType("nvarchar(120)")
                        .HasColumnName("email");

                    b.Property<Guid>("IdEnterprise")
                        .HasColumnType("uniqueidentifier")
                        .HasColumnName("id_enterprise");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("name");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(120)
                        .HasColumnType("nvarchar(120)")
                        .HasColumnName("password");

                    b.Property<DateTime?>("UpdatedDate")
                        .HasColumnType("datetime2")
                        .HasColumnName("updated_date");

                    b.Property<string>("UserCreate")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("user_create");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("user_name");

                    b.Property<string>("UserUpdate")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("user_update");

                    b.HasKey("Id");

                    b.HasIndex("IdEnterprise");

                    b.HasIndex(new[] { "CreatedDate" }, "IX_User_Created_Date");

                    b.HasIndex(new[] { "Email" }, "IX_User_Email");

                    b.HasIndex(new[] { "UserName" }, "IX_User_UserName");

                    b.ToTable("user", (string)null);
                });

            modelBuilder.Entity("api.Models.Area", b =>
                {
                    b.HasOne("api.Models.Enterprise", "Enterprise")
                        .WithMany("Areas")
                        .HasForeignKey("IdEnterprise")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Enterprise");
                });

            modelBuilder.Entity("api.Models.Line", b =>
                {
                    b.HasOne("api.Models.Area", "Area")
                        .WithMany("Lines")
                        .HasForeignKey("IdArea")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Enterprise", "Enterprise")
                        .WithMany("Lines")
                        .HasForeignKey("IdEnterprise");

                    b.HasOne("api.Models.SubArea", "SubArea")
                        .WithMany("Lines")
                        .HasForeignKey("IdSubArea");

                    b.Navigation("Area");

                    b.Navigation("Enterprise");

                    b.Navigation("SubArea");
                });

            modelBuilder.Entity("api.Models.Machine", b =>
                {
                    b.HasOne("api.Models.Enterprise", "Enterprise")
                        .WithMany("Machines")
                        .HasForeignKey("IdEnterprise");

                    b.HasOne("api.Models.Line", "Line")
                        .WithMany("Machines")
                        .HasForeignKey("IdLine")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Enterprise");

                    b.Navigation("Line");
                });

            modelBuilder.Entity("api.Models.SubArea", b =>
                {
                    b.HasOne("api.Models.Area", "Area")
                        .WithMany("SubAreas")
                        .HasForeignKey("IdArea")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("api.Models.Enterprise", "Enterprise")
                        .WithMany("SubAreas")
                        .HasForeignKey("IdEnterprise");

                    b.Navigation("Area");

                    b.Navigation("Enterprise");
                });

            modelBuilder.Entity("api.Models.User", b =>
                {
                    b.HasOne("api.Models.Enterprise", "Enterprise")
                        .WithMany("Users")
                        .HasForeignKey("IdEnterprise")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Enterprise");
                });

            modelBuilder.Entity("api.Models.Area", b =>
                {
                    b.Navigation("Lines");

                    b.Navigation("SubAreas");
                });

            modelBuilder.Entity("api.Models.Enterprise", b =>
                {
                    b.Navigation("Areas");

                    b.Navigation("Lines");

                    b.Navigation("Machines");

                    b.Navigation("SubAreas");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("api.Models.Line", b =>
                {
                    b.Navigation("Machines");
                });

            modelBuilder.Entity("api.Models.SubArea", b =>
                {
                    b.Navigation("Lines");
                });
#pragma warning restore 612, 618
        }
    }
}
