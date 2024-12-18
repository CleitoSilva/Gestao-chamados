namespace api.Dto.Lines
{
    public class LineFilter
    {
        public string name { get; set; } = string.Empty;
        public int number { get; set; }
        public string description { get; set; } = string.Empty;
        public int area { get; set; }
        public int? subarea { get; set; }
        public Guid? enterprise { get; set; }
    }
}
