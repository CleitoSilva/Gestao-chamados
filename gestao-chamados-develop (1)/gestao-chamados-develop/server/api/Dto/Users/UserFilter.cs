namespace api.Dto.Users
{
    public class UserFilter
    {
        public string username { get; set; } = string.Empty;
        public string name { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public Guid? enterprise { get; set; }
    }
}
