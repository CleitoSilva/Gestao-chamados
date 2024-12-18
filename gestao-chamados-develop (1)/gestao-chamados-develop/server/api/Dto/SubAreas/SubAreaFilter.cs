namespace api.Dto.SubAreas
{
    public class SubAreaFilter
    {
        public string name { get; set; } = string.Empty;
        public string description { get; set; } = string.Empty;
        public int area { get; set; }
        public Guid? enterprise { get; set; }
    }
}
