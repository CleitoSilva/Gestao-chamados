using api.Base;

namespace api.Models
{
    public class TechniqueCategory : Entity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int TypeCategory { get; set; }
        public int? IdAreaLocationCover { get; set; }
        public Guid? IdEnterprise { get; set; }

        public Area? AreaLocationCover { get; set; }
        public Enterprise? Enterprise { get; set; }

        public ICollection<Colaborator> Colaborators { get; set; } = new List<Colaborator>();
        public ICollection<TicketTechnique> TicketTechniques { get; set; } = new List<TicketTechnique>();
        public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}
