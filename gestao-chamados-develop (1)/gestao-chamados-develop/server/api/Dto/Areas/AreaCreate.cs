namespace api.Dto.Areas
{
    public class AreaCreate
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Guid IdEnterprise { get; set; }
    }
}
