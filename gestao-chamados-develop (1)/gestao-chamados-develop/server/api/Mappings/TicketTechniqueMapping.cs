using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Mappings
{
    public class TicketTechniqueMapping : IEntityTypeConfiguration<TicketTechnique>
    {
        public void Configure(EntityTypeBuilder<TicketTechnique> builder)
        {
            builder.HasKey(x => new { x.IdTechniqueCategory, x.IdTicket });

            builder.HasIndex(x => x.IdTechniqueCategory, "IX_TicketColaborator_IdTechniqueCategory");

            builder.HasIndex(x => x.IdTicket, "IX_TicketColaborator_IdTicket");

            builder.HasIndex(x => x.CreatedDate, "IX_TicketColaborator_Created_Date");

            builder.Property(x => x.IdTechniqueCategory)
                .HasColumnName("id_technique");

            builder.Property(x => x.IdTicket)
                .HasColumnName("id_ticket");

            builder.Property(x => x.ServiceStatus)
                .HasColumnName("service_status");

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

            builder.HasOne(x => x.TechniqueCategory)
                .WithMany(x => x.TicketTechniques)
                .HasForeignKey(x => x.IdTechniqueCategory)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.Ticket)
                .WithMany(x => x.Techniques)
                .HasForeignKey(x => x.IdTicket)
                .OnDelete(DeleteBehavior.ClientCascade);

            builder.ToTable("ticket_technique");
        }
    }
}
