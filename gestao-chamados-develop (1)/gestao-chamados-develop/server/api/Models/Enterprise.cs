using api.Base;

namespace api.Models
{
    public class Enterprise : Entity
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;

        public ICollection<User> Users { get; set; } = new List<User>();
        public ICollection<Area> Areas { get; set; } = new List<Area>();
        public ICollection<SubArea> SubAreas { get; set; } = new List<SubArea>();
        public ICollection<Line> Lines { get; set; } = new List<Line>();
        public ICollection<Machine> Machines { get; set; } = new List<Machine>();
        public ICollection<Component> Components { get; set; } = new List<Component>();
        public ICollection<ColaboratorCategory> ColaboratorCategories { get; set; } = new List<ColaboratorCategory>();
        public ICollection<TechniqueCategory> TechniqueCategories { get; set; } = new List<TechniqueCategory>();
        public ICollection<Shift> Shifts { get; set; } = new List<Shift>();
        public ICollection<Colaborator> Colaborators { get; set; } = new List<Colaborator>();
        public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}
