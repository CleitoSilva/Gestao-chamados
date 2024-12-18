namespace api.Dto.SubAreas
{
    public class SubAreaCreate
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int IdArea { get; set; }
        public Guid? IdEnterprise { get; set; }
    }
}
