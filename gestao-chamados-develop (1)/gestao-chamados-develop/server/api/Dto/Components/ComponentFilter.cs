namespace api.Dto.Components
{
    public class ComponentFilter
    {
        public string name { get; set; } = string.Empty;
        public string description { get; set; } = string.Empty;
        public int machine { get; set; }
        public Guid? enterprise { get; set; }
    }
}
