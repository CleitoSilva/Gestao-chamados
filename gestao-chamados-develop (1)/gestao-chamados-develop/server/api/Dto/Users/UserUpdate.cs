namespace api.Dto.Users
{
    public class UserUpdate
    {
        public Guid Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public Guid IdEnterprise { get; set; }
    }
}
