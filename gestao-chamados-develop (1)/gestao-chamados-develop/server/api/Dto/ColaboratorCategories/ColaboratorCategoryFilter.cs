namespace api.Dto.ColaboratorCategories
{
    public class ColaboratorCategoryFilter
    {
        public string name { get; set; } = string.Empty;
        public string description { get; set; } = string.Empty;
        public int type { get; set; } = 0;
        public Guid? enterprise { get; set; }
    }
}
