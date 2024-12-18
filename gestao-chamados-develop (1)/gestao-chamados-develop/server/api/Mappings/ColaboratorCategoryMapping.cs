using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Mappings
{
    public class ColaboratorCategoryMapping : IEntityTypeConfiguration<ColaboratorCategory>
    {
        public void Configure(EntityTypeBuilder<ColaboratorCategory> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasIndex(x => x.Name, "IX_Colaborator_Category_Name");

            builder.HasIndex(x => x.IdEnterprise, "IX_Colaborator_Category_IdEnterprise");

            builder.HasIndex(x => x.TypeCategory, "IX_Colaborator_Category_TypeCategory");

            builder.HasIndex(x => x.CreatedDate, "IX_Colaborator_Category_Created_Date");

            builder.Property(x => x.Id)
                .HasColumnName("id_colaborator_category")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .HasMaxLength(50)
                .HasColumnName("name");

            builder.Property(x => x.Description)
                .HasMaxLength(75)
                .HasColumnName("description");

            builder.Property(x => x.TypeCategory)
                .HasColumnName("type_category");

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

            builder.HasOne(x => x.Enterprise)
                .WithMany(x => x.ColaboratorCategories)
                .HasForeignKey(x => x.IdEnterprise)
                .OnDelete(DeleteBehavior.Cascade);

            builder.ToTable("colaborator_category");
        }
    }
}
