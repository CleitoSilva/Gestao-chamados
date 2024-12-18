using api.Base;

namespace api.Models
{
    public class Line : Entity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Number { get; set; }
        public string Description { get; set; } = string.Empty;
        public int IdArea { get; set; }
        public int? IdSubArea {  get; set; }
        public Guid? IdEnterprise { get; set; }

        public Area? Area { get; set; }
        public SubArea? SubArea { get; set; }
        public Enterprise? Enterprise { get; set; }

        public ICollection<Machine> Machines { get; set; } = new List<Machine>();
        public ICollection<Colaborator> Colaborators { get; set; } = new List<Colaborator>();
        public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}
