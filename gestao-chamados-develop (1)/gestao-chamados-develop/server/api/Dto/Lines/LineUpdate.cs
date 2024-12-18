namespace api.Dto.Lines
{
    public class LineUpdate
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Number { get; set; }
        public string Description { get; set; } = string.Empty;
        public int IdArea { get; set; }
        public int? IdSubArea { get; set; }
    }
}
