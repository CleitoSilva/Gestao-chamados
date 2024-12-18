namespace api.Dto.ColaboratorCategories
{
    public class ColaboratorCategoryCreate
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int TypeCategory { get; set; }
        public Guid IdEnterprise { get; set; }
    }
}
