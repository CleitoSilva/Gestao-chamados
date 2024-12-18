using System.Text.Json;

namespace api.Dto.Events
{
    public class EventBase
    {
        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
