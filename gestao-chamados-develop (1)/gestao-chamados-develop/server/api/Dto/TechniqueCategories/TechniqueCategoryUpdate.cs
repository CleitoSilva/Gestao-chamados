namespace api.Dto.TechniqueCategories
{
    public class TechniqueCategoryUpdate
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int TypeCategory { get; set; }
        public int IdAreaLocationCover { get; set; }
    }
}
