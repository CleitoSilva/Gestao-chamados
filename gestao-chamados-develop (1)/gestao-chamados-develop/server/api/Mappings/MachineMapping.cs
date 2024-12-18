using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Mappings
{
    public class MachineMapping : IEntityTypeConfiguration<Machine>
    {
        public void Configure(EntityTypeBuilder<Machine> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasIndex(x => x.Name, "IX_Machine_Name");

            builder.HasIndex(x => x.IdLine, "IX_Machine_IdLine");

            builder.HasIndex(x => x.IdEnterprise, "IX_Machine_IdEnterprise");

            builder.HasIndex(x => x.CreatedDate, "IX_Machine_Created_Date");

            builder.Property(x => x.Id)
                .HasColumnName("id_machine")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .HasMaxLength(50)
                .HasColumnName("name");

            builder.Property(x => x.Description)
                .HasMaxLength(75)
                .HasColumnName("description");

            builder.Property(x => x.Order)
                .HasColumnName("order");

            builder.Property(x => x.IdLine)
                .HasColumnName("id_line");

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

            builder.HasOne(x => x.Line)
                .WithMany(x => x.Machines)
                .HasForeignKey(x => x.IdLine)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Enterprise)
                .WithMany(x => x.Machines)
                .HasForeignKey(x => x.IdEnterprise)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.ToTable("machine");
        }
    }
}
