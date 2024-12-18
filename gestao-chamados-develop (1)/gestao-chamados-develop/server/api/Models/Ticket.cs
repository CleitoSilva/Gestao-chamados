using api.Base;
using api.Helpers.Enums;

namespace api.Models
{
    public class Ticket : Entity
    {
        public int Id { get; set; }
        public double TotalTicketTime { get; set; }
        public double TotalWaitingTechnicalTime { get; set; }
        public double TotalServiceTime { get; set; }
        public int Status { get; set; }
        public int? IdOpenColaborator { get; set; }
        public int? IdResponsibleManutentor { get; set; }
        public int? IdArea { get; set; }
        public int? IdSubArea { get; set; }
        public int? IdLine { get; set; }
        public int? IdMachine { get; set; }
        public int? IdComponent { get; set; }
        public int? IdTechniqueCategory { get; set; }
        public Guid IdEnterprise { get; set; }

        public Colaborator? OpenColaborator { get; set; }
        public Colaborator? ResponsibleManutentor { get; set; }
        public Area? Area { get; set; }
        public SubArea? SubArea { get; set; }
        public Line? Line { get; set; }
        public Machine? Machine { get; set; }
        public Component? Component { get; set; }
        public TechniqueCategory? TechniqueCategory { get; set; }
        public Enterprise? Enterprise { get; set; }

        public ICollection<Event> Events { get; set; } = new List<Event>();
        public ICollection<TicketColaborator> Colaborators { get; set; } = new List<TicketColaborator>();
        public ICollection<TicketTechnique> Techniques { get; set; } = new List<TicketTechnique>();

        public bool Equals(Ticket ticket)
        {
            if (ticket == null) return false;

            return this.IdOpenColaborator == ticket.IdOpenColaborator &&
                    this.IdArea == ticket.IdArea &&
                    this.IdSubArea == ticket.IdSubArea &&
                    this.IdLine == ticket.IdLine &&
                    this.IdMachine == ticket.IdMachine &&
                    this.IdComponent == ticket.IdComponent &&
                    this.IdTechniqueCategory == ticket.IdTechniqueCategory &&
                    this.IdEnterprise == ticket.IdEnterprise &&
                    this.Status == (int)TicketStatus.OPEN;
        }
    }
}
