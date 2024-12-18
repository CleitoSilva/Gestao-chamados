namespace api.Dto.TechniqueCategories
{
    public class TechniqueCategoryFilter
    {
        public string name { get; set; } = string.Empty;
        public string description { get; set; } = string.Empty;
        public int type { get; set; }
        public int location { get; set; }
        public Guid? enterprise { get; set; }
    }
}
