using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Mappings
{
    public class UserMapping : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasIndex(x => x.UserName, "IX_User_UserName");

            builder.HasIndex(x => x.Email, "IX_User_Email");

            builder.HasIndex(x => x.CreatedDate, "IX_User_Created_Date");

            builder.Property(x => x.Id)
                .HasColumnName("id_user")
                .HasDefaultValueSql("NEWID()");

            builder.Property(x => x.UserName)
                .HasMaxLength(50)
                .HasColumnName("user_name");

            builder.Property(x => x.Name)
                .HasMaxLength(50)
                .HasColumnName("name");

            builder.Property(x => x.Email)
                .HasMaxLength(120)
                .HasColumnName("email");

            builder.Property(x => x.Password)
                .HasMaxLength(120)
                .HasColumnName("password");

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
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.IdEnterprise)
                .OnDelete(DeleteBehavior.Cascade);

            builder.ToTable("user");
        }
    }
}
