namespace api.Notifications
{
    public interface INotificator
    {
        void AddNotification(string message);
        IEnumerable<Notification> GetAllNotifications();
        bool HasNotification();
    }
}
