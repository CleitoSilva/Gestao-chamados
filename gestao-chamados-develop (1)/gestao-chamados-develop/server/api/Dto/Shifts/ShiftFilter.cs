namespace api.Dto.Shifts
{
    public class ShiftFilter
    {
        public string description { get; set; } = string.Empty;
        public string start { get; set; } = string.Empty;
        public string end { get; set; } = string.Empty;
        public Guid? enterprise { get; set; }
    }
}
