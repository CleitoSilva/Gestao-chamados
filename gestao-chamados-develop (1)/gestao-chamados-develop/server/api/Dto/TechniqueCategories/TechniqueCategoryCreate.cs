namespace api.Dto.TechniqueCategories
{
    public class TechniqueCategoryCreate
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int TypeCategory { get; set; }
        public int IdAreaLocationCover { get; set; }
        public Guid? IdEnterprise { get; set; }
    }
}
