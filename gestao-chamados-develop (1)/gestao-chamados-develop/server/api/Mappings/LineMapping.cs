using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Mappings
{
    public class LineMapping : IEntityTypeConfiguration<Line>
    {
        public void Configure(EntityTypeBuilder<Line> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasIndex(x => x.Name, "IX_Line_Name");

            builder.HasIndex(x => x.IdArea, "IX_Line_Area");

            builder.HasIndex(x => x.IdSubArea, "IX_Line_SubArea");

            builder.HasIndex(x => x.IdEnterprise, "IX_Line_Enterprise");

            builder.HasIndex(x => x.CreatedDate, "IX_Line_Created_Date");

            builder.Property(x => x.Id)
                .HasColumnName("id_line")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .HasMaxLength(50)
                .HasColumnName("name");

            builder.Property(x => x.Number)
                .HasColumnName("number");

            builder.Property(x => x.Description)
                .HasMaxLength(75)
                .HasColumnName("description");

            builder.Property(x => x.IdArea)
                .HasColumnName("id_area");

            builder.Property(x => x.IdSubArea)
                .HasColumnName("id_subarea");

            builder.Property(x => x.IdEnterprise)
                .HasColumnName("id_enterprise");

            builder.Property(x => x.UserCreate)
                .HasMaxLength(50)
                .HasColumnName("user_create");

            builder.Property(x => x.CreatedDate)
                .HasColumnType("datetime2")
                .HasColumnName("created_date");

            builder.Property(x => x.UserUpdate)
                .HasMaxLength(50)
                .HasColumnName("user_update");

            builder.Property(x => x.UpdatedDate)
                .HasColumnType("datetime2")
                .HasColumnName("updated_date");

            builder.HasOne(x => x.Area)
                .WithMany(x => x.Lines)
                .HasForeignKey(x => x.IdArea)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.SubArea)
                .WithMany(x => x.Lines)
                .HasForeignKey(x => x.IdSubArea)
                .OnDelete(DeleteBehavior.ClientCascade);

            builder.HasOne(x => x.Enterprise)
                .WithMany(x => x.Lines)
                .HasForeignKey(x => x.IdEnterprise)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.ToTable("line");
        }
    }
}
