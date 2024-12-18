using api.Base;

namespace api.Models
{
    public class SubArea : Entity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int IdArea { get; set; }
        public Guid? IdEnterprise { get; set; }

        public Area? Area { get; set; }
        public Enterprise? Enterprise { get; set; }

        public ICollection<Line> Lines { get; set; } = new List<Line>();
        public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}
