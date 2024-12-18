using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Mappings
{
    public class TicketColaboratorMapping : IEntityTypeConfiguration<TicketColaborator>
    {
        public void Configure(EntityTypeBuilder<TicketColaborator> builder) 
        {
            builder.HasKey(x => new { x.IdColaborator, x.IdTicket });

            builder.HasIndex(x => x.IdColaborator, "IX_TicketColaborator_IdColaborator");

            builder.HasIndex(x => x.IdTicket, "IX_TicketColaborator_IdTicket");

            builder.HasIndex(x => x.CreatedDate, "IX_TicketColaborator_Created_Date");

            builder.Property(x => x.IdColaborator)
                .HasColumnName("id_colaborator");

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

            builder.HasOne(x => x.Colaborator)
                .WithMany(x => x.WorkedTickets)
                .HasForeignKey(x => x.IdColaborator)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Ticket)
                .WithMany(x => x.Colaborators)
                .HasForeignKey(x => x.IdTicket)
                .OnDelete(DeleteBehavior.ClientCascade);

            builder.ToTable("ticket_colaborator");
        }
    }
}
