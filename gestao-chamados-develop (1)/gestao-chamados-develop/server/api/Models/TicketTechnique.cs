using api.Base;

namespace api.Models
{
    public class TicketTechnique : Entity
    {
        public int IdTechniqueCategory { get; set; }
        public int IdTicket { get; set; }

        public int ServiceStatus { get; set; }

        public TechniqueCategory? TechniqueCategory { get; set; }
        public Ticket? Ticket { get; set; }
    }
}
