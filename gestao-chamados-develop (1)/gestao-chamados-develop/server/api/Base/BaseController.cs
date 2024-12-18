using Microsoft.AspNetCore.Mvc;
using api.Notifications;
using api.Dto;

namespace api.Base
{
    public abstract class BaseController : ControllerBase
    {
        private readonly INotificator _notificator;

        protected BaseController(INotificator notificator)
        {
            _notificator = notificator;
        }

        protected void AddNotification(string message)
        {
            _notificator.AddNotification(message);
        }

        protected IEnumerable<Notification> GetAllNotifications()
        {
            return _notificator.GetAllNotifications();
        }

        protected bool HasNotification()
        {
            return _notificator.HasNotification();
        }

        protected BadRequestObjectResult BadRequestBehavior(string errorMessage)
        {
            if (HasNotification())
            {
                var notifications = _notificator.GetAllNotifications();
                return BadRequest(new { errorsCount = notifications.Count(), notifications });
            } 

            AddNotification(errorMessage);
            var errorNotification = _notificator.GetAllNotifications();
            return BadRequest(new { errorsCount = errorNotification.Count(), notifications = errorNotification });
        }

        protected Success SuccessBehavior(string message, object? data = null)
        {
            var notifications = _notificator.GetAllNotifications();

            return new Success
            {
                Message = message,
                Payload = data,
                NotificationsCount = notifications.Count(),
                Notifications = notifications
            };
        }
    }
}
