using api.Base;

namespace api.Models
{
    public class Component : Entity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int IdMachine { get; set; }
        public Guid? IdEnterprise { get; set; }

        public Machine? Machine { get; set; }
        public Enterprise? Enterprise { get; set; }

        public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}
