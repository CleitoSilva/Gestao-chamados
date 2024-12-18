using api.Base;

namespace api.Models
{
    public class Colaborator : Entity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string BadgeCardNumber { get; set; } = string.Empty; // Número do crachá
        public string RFIDCardNumber { get; set; } = string.Empty;
        public string RENumber { get; set; } = string.Empty;
        public int? IdColaboratorCategory { get; set; }
        public int IdTechniqueCategory { get; set; }
        public int? IdShift { get; set; }
        public int? IdLine { get; set; }
        public Guid IdEnterprise { get; set; }

        public ColaboratorCategory? ColaboratorCategory { get; set; }
        public TechniqueCategory? TechniqueCategory { get; set; }
        public Shift? Shift { get; set; }
        public Line? Line { get; set; }
        public Enterprise? Enterprise { get; set; }

        public ICollection<Ticket> OpenedTickes { get; set; } = new List<Ticket>();
        public ICollection<Ticket> ResponsibleTickets { get; set; } = new List<Ticket>();
        public ICollection<TicketColaborator> WorkedTickets { get; set; } = new List<TicketColaborator>();
    }
}
