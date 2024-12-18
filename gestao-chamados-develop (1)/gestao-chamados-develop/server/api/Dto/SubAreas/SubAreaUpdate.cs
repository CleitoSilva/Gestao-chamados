namespace api.Dto.SubAreas
{
    public class SubAreaUpdate
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int IdArea { get; set; }
    }
}
