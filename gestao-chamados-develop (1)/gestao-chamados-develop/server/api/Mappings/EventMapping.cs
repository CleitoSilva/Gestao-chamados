using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Mappings
{
    public class EventMapping : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasIndex(x => x.IdTicket, "IX_Event_IdTicket");

            builder.HasIndex(x => x.CreatedDate, "IX_Ticket_Created_Date");

            builder.Property(x => x.Id)
                .HasColumnName("id_event")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Code)
                .HasColumnName("code");

            builder.Property(x => x.Name)
                .HasMaxLength(50)
                .HasColumnName("name");

            builder.Property(x => x.Timestamp)
                .HasColumnName("timestamp");

            builder.Property(x => x.Message)
                .HasMaxLength(300)
                .HasColumnName("message");

            builder.Property(x => x.IdTicket)
                .HasColumnName("id_ticket");

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

            builder.HasOne(x => x.Ticket)
                .WithMany(x => x.Events)
                .HasForeignKey(x => x.IdTicket)
                .OnDelete(DeleteBehavior.Cascade);

            builder.ToTable("event");
        }
    }
}
