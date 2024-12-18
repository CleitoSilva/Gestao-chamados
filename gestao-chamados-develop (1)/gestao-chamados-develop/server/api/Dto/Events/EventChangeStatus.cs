using System.Text.Json;

namespace api.Dto.Events
{
    public class EventChangeStatus : EventBase
    {
        public int LastStatus { get; set; }
        public int NewStatus { get; set; }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
