using api.Notifications;

namespace api.Dto
{
    public class Success
    {
        public string Message { get; set; } = string.Empty;
        public object? Payload { get; set; } = null;
        public int NotificationsCount { get; set; }
        public IEnumerable<Notification> Notifications { get; set; } = new List<Notification>();
    }
}
