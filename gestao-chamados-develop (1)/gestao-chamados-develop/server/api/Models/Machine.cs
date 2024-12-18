using api.Base;

namespace api.Models
{
    public class Machine : Entity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Order { get; set; }
        public int IdLine {  get; set; }
        public Guid? IdEnterprise { get; set; }

        public Line? Line { get; set; }
        public Enterprise? Enterprise { get; set; }

        public ICollection<Component> Components { get; set; } = new List<Component>();
        public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}
