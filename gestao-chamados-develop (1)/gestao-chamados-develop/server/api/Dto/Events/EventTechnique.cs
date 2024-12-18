using System.Text.Json;

namespace api.Dto.Events
{
    public class EventTechnique
    {
        public string NameTech { get; set; } = string.Empty;
        public string AreaTech { get; set; } = string.Empty;
        public int? StatusTech { get; set; }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
