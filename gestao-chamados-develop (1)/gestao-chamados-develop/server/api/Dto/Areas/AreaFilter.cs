namespace api.Dto.Areas
{
    public class AreaFilter
    {
        public string name { get; set; } = string.Empty;
        public string description { get; set; } = string.Empty;
        public Guid? enterprise { get; set; }
    }
}
