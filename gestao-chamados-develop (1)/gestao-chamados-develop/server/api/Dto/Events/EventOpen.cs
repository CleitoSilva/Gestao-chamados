using System.Text.Json;

namespace api.Dto.Events
{
    public class EventOpen : EventBase
    {
        public string OpenBy { get; set; } = string.Empty;
        public string AreaFor { get; set; } = string.Empty;
        public string SubAreaFor { get; set; } = string.Empty;
        public string LineFor { get; set; } = string.Empty;
        public string MachineFor { get; set; } = string.Empty;
        public string ComponentFor { get; set; } = string.Empty;
        public string TechniqueCategoryAsked { get; set; } = string.Empty;

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
