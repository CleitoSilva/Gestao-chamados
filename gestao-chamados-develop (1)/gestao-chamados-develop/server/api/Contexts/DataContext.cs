using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Contexts
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public virtual DbSet<Enterprise> Enterprises { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Area> Areas { get; set; }
        public virtual DbSet<SubArea> SubAreas { get; set; }
        public virtual DbSet<Line> Lines { get; set; }
        public virtual DbSet<Machine> Machines { get; set; }
        public virtual DbSet<Component> Components { get; set; }
        public virtual DbSet<ColaboratorCategory> ColaboratorCategories { get; set; }
        public virtual DbSet<TechniqueCategory> TechniqueCategories { get; set; }
        public virtual DbSet<Shift> Shifts { get; set; }
        public virtual DbSet<Colaborator> Colaborators { get; set; }
        public virtual DbSet<Ticket> Tickets { get; set; }
        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<TicketColaborator> TicketColaborators { get; set; }
        public virtual DbSet<TicketTechnique> TicketTechniques { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);

            base.OnModelCreating(modelBuilder);
        }
    }
}
