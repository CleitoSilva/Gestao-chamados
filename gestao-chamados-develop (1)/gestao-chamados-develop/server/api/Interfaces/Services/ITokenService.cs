using api.Models;

namespace api.Interfaces.Services
{
    public interface ITokenService
    {
        string GenerateJwtToken(User user);
        void AddTokenToBlacklist(string token);
        bool IsTokenBlacklisted(string token);
    }
}
