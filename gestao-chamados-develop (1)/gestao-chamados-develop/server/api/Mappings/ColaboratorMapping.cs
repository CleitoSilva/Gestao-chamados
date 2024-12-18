using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Mappings
{
    public class ColaboratorMapping : IEntityTypeConfiguration<Colaborator>
    {
        public void Configure(EntityTypeBuilder<Colaborator> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasIndex(x => x.Name, "IX_Colaborator_Name");

            builder.HasIndex(x => x.IdEnterprise, "IX_Colaborator_IdEnterprise");

            builder.HasIndex(x => x.IdColaboratorCategory, "IX_Colaborator_IdColaboratorCategory");

            builder.HasIndex(x => x.IdTechniqueCategory, "IX_Colaborator_IdTechniqueCategory");

            builder.HasIndex(x => x.IdShift, "IX_Colaborator_IdShift");

            builder.HasIndex(x => x.IdLine, "IX_Colaborator_IdLine");

            builder.HasIndex(x => x.CreatedDate, "IX_Colaborator_Created_Date");

            builder.Property(x => x.Id)
                .HasColumnName("id_colaborator")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .HasMaxLength(50)
                .HasColumnName("name");

            builder.Property(x => x.BadgeCardNumber)
                .HasMaxLength(20)
                .HasColumnName("badge_card_number");

            builder.Property(x => x.RFIDCardNumber)
                .HasMaxLength(20)
                .HasColumnName("rfid_card_number");

            builder.Property(x => x.RENumber)
                .HasMaxLength(20)
                .HasColumnName("re_number");

            builder.Property(x => x.IdColaboratorCategory)
                .HasColumnName("id_colaborator_category");

            builder.Property(x => x.IdTechniqueCategory)
                .HasColumnName("id_technique_category");

            builder.Property(x => x.IdLine)
                .HasColumnName("id_line");

            builder.Property(x => x.IdShift)
                .HasColumnName("id_shift");

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
                .WithMany(x => x.Colaborators)
                .HasForeignKey(x => x.IdEnterprise)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.ColaboratorCategory)
                .WithMany(x => x.Colaborators)
                .HasForeignKey(x => x.IdColaboratorCategory)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(x => x.TechniqueCategory)
                .WithMany(x => x.Colaborators)
                .HasForeignKey(x => x.IdTechniqueCategory)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(x => x.Line)
                .WithMany(x => x.Colaborators)
                .HasForeignKey(x => x.IdLine)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(x => x.Shift)
                .WithMany(x => x.Colaborators)
                .HasForeignKey(x => x.IdShift)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.ToTable("colaborator");
        }
    }
}
