using api.Models;

namespace api.Interfaces.Services
{
    public interface ICurrentUserService
    {
        User? GetUser();
        string? GetUserName();
        void SetUser(User user);
    }
}
