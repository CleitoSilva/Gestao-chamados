using api.Interfaces.Services;
using api.Models;

namespace api.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private User? _user;

        public CurrentUserService()
        {
            _user = null;
        }

        public User? GetUser()
        {
            return _user;
        }

        public string? GetUserName()
        {
            return _user != null ? _user.UserName : null;
        }

        public void SetUser(User user)
        {
            _user = user;
        }
    }
}
