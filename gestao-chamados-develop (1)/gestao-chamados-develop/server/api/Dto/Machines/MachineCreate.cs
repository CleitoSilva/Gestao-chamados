namespace api.Dto.Machines
{
    public class MachineCreate
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Order { get; set; }
        public int IdLine { get; set; }
        public Guid? IdEnterprise { get; set; }
    }
}
