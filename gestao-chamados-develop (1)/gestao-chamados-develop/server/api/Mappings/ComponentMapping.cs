using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Mappings
{
    public class ComponentMapping : IEntityTypeConfiguration<Component>
    {
        public void Configure(EntityTypeBuilder<Component> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasIndex(x => x.Name, "IX_Component_Name");

            builder.HasIndex(x => x.IdMachine, "IX_Component_IdMachine");

            builder.HasIndex(x => x.IdEnterprise, "IX_Component_IdEnterprise");

            builder.HasIndex(x => x.CreatedDate, "IX_Component_Created_Date");

            builder.Property(x => x.Id)
                .HasColumnName("id_component")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .HasMaxLength(50)
                .HasColumnName("name");

            builder.Property(x => x.Description)
                .HasMaxLength(75)
                .HasColumnName("description");

            builder.Property(x => x.IdMachine)
                .HasColumnName("id_machine");

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
            
            builder.HasOne(x => x.Machine)
                .WithMany(x => x.Components)
                .HasForeignKey(x => x.IdMachine)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Enterprise)
                .WithMany(x => x.Components)
                .HasForeignKey(x => x.IdEnterprise)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.ToTable("component");
        }
    }
}
