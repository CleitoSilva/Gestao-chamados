
namespace api.Notifications
{
    public class Notificator : INotificator
    {
        private readonly List<Notification> _notifications;

        public Notificator()
        {
            _notifications = new List<Notification>();
        }

        public void AddNotification(string message)
        {
            var newNotify = new Notification
            {
                Id = _notifications.Count + 1,
                Message = message,
                Timestamp = DateTime.UtcNow
            };

            _notifications.Add(newNotify);
        }

        public IEnumerable<Notification> GetAllNotifications()
        {
            return _notifications;
        }

        public bool HasNotification()
        {
            return _notifications.Any();
        }
    }
}
