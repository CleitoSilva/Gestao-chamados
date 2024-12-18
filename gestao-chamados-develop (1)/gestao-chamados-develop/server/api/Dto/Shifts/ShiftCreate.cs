namespace api.Dto.Shifts
{
    public class ShiftCreate
    {
        public string Description { get; set; } = string.Empty;
        public string StartHour { get; set; } = string.Empty;
        public string EndHour { get; set; } = string.Empty; 
        public Guid IdEnterprise { get; set; }
    }
}
