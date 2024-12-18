using api.Base;

namespace api.Models
{
    public class ColaboratorCategory : Entity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int TypeCategory { get; set; }
        public Guid IdEnterprise { get; set; }

        public Enterprise? Enterprise { get; set; }

        public ICollection<Colaborator> Colaborators { get; set; } = new List<Colaborator>();
    }
}
