using api.Models;

namespace api.Dto.Auth
{
    public class AuthUser
    {
        public Guid Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public Guid IdEnterprise { get; set; }

        public Enterprise? Enterprise { get; set; }
    }
}
