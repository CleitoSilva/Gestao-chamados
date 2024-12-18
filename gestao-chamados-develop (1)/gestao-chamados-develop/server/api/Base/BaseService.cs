using FluentValidation;
using FluentValidation.Results;
using api.Interfaces;
using api.Notifications;

namespace api.Base
{
    public abstract class BaseService
    {
        private readonly IUnitOfWork _uow;
        private readonly INotificator _notificator;

        protected BaseService(IUnitOfWork uow, INotificator notificator)
        {
            _uow = uow;
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

        protected async Task<bool> PersistChanges()
        {
            return await _uow.Commit() > 0;
        }

        protected bool ValidateObject<TE>(AbstractValidator<TE> validator, TE obj)
        {
            ValidationResult result = validator.Validate(obj);

            if (!result.IsValid)
            {
                foreach (var error in result.Errors)
                {
                    _notificator.AddNotification($"Validation error: {error.ErrorMessage}");
                }

                return false;
            }

            return true;
        }
    }
}
