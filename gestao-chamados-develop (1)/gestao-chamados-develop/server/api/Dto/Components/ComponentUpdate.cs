namespace api.Dto.Components
{
    public class ComponentUpdate
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int IdMachine { get; set; }
    }
}
