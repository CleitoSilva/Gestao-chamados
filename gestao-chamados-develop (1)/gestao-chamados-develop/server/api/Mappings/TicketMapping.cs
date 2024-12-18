using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace api.Mappings
{
    public class TicketMapping : IEntityTypeConfiguration<Ticket>
    {
        public void Configure(EntityTypeBuilder<Ticket> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasIndex(x => x.IdEnterprise, "IX_Ticket_IdEnterprise");

            builder.HasIndex(x => x.CreatedDate, "IX_Ticket_Created_Date");

            builder.Property(x => x.Id)
                .HasColumnName("id_ticket")
                .ValueGeneratedOnAdd();

            builder.Property(x => x.TotalTicketTime)
                .HasColumnName("total_ticket_time");

            builder.Property(x => x.TotalWaitingTechnicalTime)
                .HasColumnName("total_waiting_time");

            builder.Property(x => x.TotalServiceTime)
                .HasColumnName("total_service_time");

            builder.Property(x => x.Status)
                .HasColumnName("status");

            builder.Property(x => x.IdOpenColaborator)
                .HasColumnName("id_open_colaborator");

            builder.Property(x => x.IdResponsibleManutentor)
                .HasColumnName("id_responsible_manutentor");

            builder.Property(x => x.IdArea)
                .HasColumnName("id_area");

            builder.Property(x => x.IdSubArea)
                .HasColumnName("id_subarea");

            builder.Property(x => x.IdLine)
                .HasColumnName("id_line");

            builder.Property(x => x.IdMachine)
                .HasColumnName("id_machine");

            builder.Property(x => x.IdComponent)
                .HasColumnName("id_component");

            builder.Property(x => x.IdTechniqueCategory)
                .HasColumnName("id_technique_category");

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

            builder.HasOne(x => x.OpenColaborator)
                .WithMany(x => x.OpenedTickes)
                .HasForeignKey(x => x.IdOpenColaborator)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(x => x.ResponsibleManutentor)
                .WithMany(x => x.ResponsibleTickets)
                .HasForeignKey(x => x.IdResponsibleManutentor)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(x => x.Area)
                .WithMany(x => x.Tickets)
                .HasForeignKey(x => x.IdArea)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(x => x.SubArea)
                .WithMany(x => x.Tickets)
                .HasForeignKey(x => x.IdSubArea)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(x => x.Line)
                .WithMany(x => x.Tickets)
                .HasForeignKey(x => x.IdLine)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(x => x.Machine)
                .WithMany(x => x.Tickets)
                .HasForeignKey(x => x.IdMachine)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(x => x.Component)
                .WithMany(x => x.Tickets)
                .HasForeignKey(x => x.IdComponent)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(x => x.TechniqueCategory)
                .WithMany(x => x.Tickets)
                .HasForeignKey(x => x.IdTechniqueCategory)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(x => x.Enterprise)
                .WithMany(x => x.Tickets)
                .HasForeignKey(x => x.IdEnterprise)
                .OnDelete(DeleteBehavior.Cascade);

            builder.ToTable("ticket");
        }
    }
}
