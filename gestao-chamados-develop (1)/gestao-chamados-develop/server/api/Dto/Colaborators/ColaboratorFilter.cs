namespace api.Dto.Colaborators
{
    public class ColaboratorFilter
    {
        public string name { get; set; } = string.Empty;
        public string badge { get; set; } = string.Empty; // Número do crachá
        public string rfid { get; set; } = string.Empty;
        public string re { get; set; } = string.Empty;
        public int? category { get; set; }
        public int? technique { get; set; }
        public int? shift { get; set; }
        public int? line { get; set; }
        public Guid? enterprise { get; set; }
    }
}
