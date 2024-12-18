using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Mappings
{
    public class SubAreaMapping : IEntityTypeConfiguration<SubArea>
    {
        public void Configure(EntityTypeBuilder<SubArea> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasIndex(x => x.Name, "IX_SubArea_Name");

            builder.HasIndex(x => x.IdArea, "IX_SubArea_IdArea");

            builder.HasIndex(x => x.IdEnterprise, "IX_SubArea_IdEnterprise");

            builder.HasIndex(x => x.CreatedDate, "IX_SubArea_Created_Date");

            builder.Property(x => x.Id)
                .HasColumnName("id_subarea")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .HasMaxLength(50)
                .HasColumnName("name");

            builder.Property(x => x.Description)
                .HasMaxLength(75)
                .HasColumnName("description");

            builder.Property(x => x.IdArea)
                .HasColumnName("id_area");

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
                .WithMany(x => x.SubAreas)
                .HasForeignKey(x => x.IdArea)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Enterprise)
                .WithMany(x => x.SubAreas)
                .HasForeignKey(x => x.IdEnterprise)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.ToTable("subarea");
        }
    }
}
