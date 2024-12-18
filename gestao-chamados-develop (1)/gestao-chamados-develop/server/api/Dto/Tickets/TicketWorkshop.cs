using api.Helpers.Enums;
using api.Models;

namespace api.Dto.Tickets
{
    public class TicketWorkshop
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

        public Generic? OpenColaborator { get; set; }
        public Generic? ResponsibleManutentor { get; set; }
        public Generic? Area { get; set; }
        public Generic? SubArea { get; set; }
        public Generic? Line { get; set; }
        public Generic? Machine { get; set; }
        public TechniqueCategory? TechniqueCategory { get; set; }
        public Enterprise? Enterprise { get; set; }
        public ICollection<Generic_Technique> Techniques { get; set; } = new List<Generic_Technique>();
        public string? UserCreate { get; set; } = string.Empty;
        public DateTime? CreatedDate { get; set; }
        public string? UserUpdate { get; set; } = string.Empty;
        public DateTime? UpdatedDate { get; set; }
    }

    public class Generic
    {
        public string name { get; set; } = "";
    }
    public class Generic_Technique
    {
        public string serviceStatus { get; set; } = "";
        public string idTicket { get; set; } = "";
        public string idTechniqueCategory { get; set; } = "";

    }
}
