using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Mappings
{
    public class TechniqueCategoryMapping : IEntityTypeConfiguration<TechniqueCategory>
    {
        public void Configure(EntityTypeBuilder<TechniqueCategory> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasIndex(x => x.Name, "IX_Technique_Category_Name");

            builder.HasIndex(x => x.IdEnterprise, "IX_Technique_Category_IdEnterprise");

            builder.HasIndex(x => x.TypeCategory, "IX_Technique_Category_TypeCategory");

            builder.HasIndex(x => x.CreatedDate, "IX_Technique_Category_Created_Date");

            builder.Property(x => x.Id)
                .HasColumnName("id_technique_category")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .HasMaxLength(50)
                .HasColumnName("name");

            builder.Property(x => x.Description)
                .HasMaxLength(75)
                .HasColumnName("description");

            builder.Property(x => x.TypeCategory)
                .HasColumnName("type_category");

            builder.Property(x => x.IdAreaLocationCover)
                .HasColumnName("id_area_location_cover");

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

            builder.HasOne(x => x.AreaLocationCover)
                .WithMany(x => x.TechniqueCategories)
                .HasForeignKey(x => x.IdAreaLocationCover)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(x => x.Enterprise)
                .WithMany(x => x.TechniqueCategories)
                .HasForeignKey(x => x.IdEnterprise)
                .OnDelete(DeleteBehavior.Cascade);

            builder.ToTable("technique_category");
        }
    }
}
