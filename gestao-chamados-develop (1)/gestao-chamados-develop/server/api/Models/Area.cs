using api.Base;

namespace api.Models
{
    public class Area : Entity 
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Guid IdEnterprise { get; set; }

        public Enterprise? Enterprise { get; set; }

        public ICollection<SubArea> SubAreas { get; set; } = new List<SubArea>();
        public ICollection<Line> Lines { get; set; } = new List<Line>();
        public ICollection<TechniqueCategory> TechniqueCategories { get; set; } = new List<TechniqueCategory>();
        public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}
