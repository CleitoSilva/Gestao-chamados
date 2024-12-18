using System.Text.Json;

namespace api.Dto.Events
{
    public class EventColaborator : EventBase
    {
        public string Name { get; set; } = string.Empty;
        public string TechniqueCategory { get; set; } = string.Empty;

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
