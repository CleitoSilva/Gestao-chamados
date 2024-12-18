namespace api.Dto.Components
{
    public class ComponentCreate
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int IdMachine { get; set; }
        public Guid? IdEnterprise { get; set; }
    }
}
