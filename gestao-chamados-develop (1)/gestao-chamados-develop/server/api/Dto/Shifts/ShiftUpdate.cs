namespace api.Dto.Shifts
{
    public class ShiftUpdate
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public string StartHour { get; set; } = string.Empty;
        public string EndHour { get; set; } = string.Empty;
    }
}
