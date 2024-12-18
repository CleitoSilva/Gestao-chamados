using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Mappings
{
    public class ShiftMapping : IEntityTypeConfiguration<Shift>
    {
        public void Configure(EntityTypeBuilder<Shift> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasIndex(x => x.StartHour, "IX_Shift_StartHour");

            builder.HasIndex(x => x.EndHour, "IX_Shift_EndHour");

            builder.HasIndex(x => x.IdEnterprise, "IX_Colaborator_Category_IdEnterprise");

            builder.HasIndex(x => x.CreatedDate, "IX_Colaborator_Category_Created_Date");

            builder.Property(x => x.Id)
                .HasColumnName("id_shift")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Description)
                .HasMaxLength(50)
                .HasColumnName("description");

            builder.Property(x => x.StartHour)
                .HasMaxLength(10)
                .HasColumnName("start_hour");

            builder.Property(x => x.EndHour)
                .HasMaxLength(10)
                .HasColumnName("end_hour");

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
                .WithMany(x => x.Shifts)
                .HasForeignKey(x => x.IdEnterprise)
                .OnDelete(DeleteBehavior.Cascade);

            builder.ToTable("shift");
        }
    }
}
