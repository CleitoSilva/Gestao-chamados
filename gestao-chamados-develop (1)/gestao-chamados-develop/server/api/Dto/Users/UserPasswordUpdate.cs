namespace api.Dto.Users
{
    public class UserPasswordUpdate
    {
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string Password { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}
