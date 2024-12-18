namespace api.Dto.Colaborators
{
    public class ColaboratorCreate
    {
        public string Name { get; set; } = string.Empty;
        public string BadgeCardNumber { get; set; } = string.Empty; // Número do crachá
        public string RFIDCardNumber { get; set; } = string.Empty;
        public string RENumber { get; set; } = string.Empty;
        public int? IdColaboratorCategory { get; set; }
        public int? IdTechniqueCategory { get; set; }
        public int? IdShift { get; set; }
        public int? IdLine { get; set; }
        public Guid IdEnterprise { get; set; }
    }
}
