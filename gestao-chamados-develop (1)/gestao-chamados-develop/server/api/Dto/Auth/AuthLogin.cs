namespace api.Dto.Auth
{
    public class AuthLogin
    {
        public string UserNameOrEmail { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
