using api.Base;

namespace api.Models
{
    public class Shift : Entity
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public string StartHour { get; set; } = string.Empty;
        public string EndHour { get; set; } = string.Empty;
        public Guid IdEnterprise { get; set; }

        public Enterprise? Enterprise { get; set; }

        public ICollection<Colaborator> Colaborators { get; set; } = new List<Colaborator>();
    }
}
