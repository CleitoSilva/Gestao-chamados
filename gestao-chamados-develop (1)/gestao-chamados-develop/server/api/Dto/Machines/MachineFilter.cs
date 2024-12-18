namespace api.Dto.Machines
{
    public class MachineFilter
    {
        public string name { get; set; } = string.Empty;
        public string description { get; set; } = string.Empty;
        public int order { get; set; }
        public int line { get; set; }
        public Guid? enterprise { get; set; }
    }
}
