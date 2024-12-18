using System.Text.Json;

namespace api.Dto.Events
{
    public class EventChangeResponsible : EventBase
    {
        public string LastResponsible { get; set; } = string.Empty;
        public string NewResponsible { get; set; } = string.Empty;

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
