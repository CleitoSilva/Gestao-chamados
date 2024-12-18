namespace api.Dto.Tickets
{
    public class TicketCreate
    {
        public int IdOpenColaborator { get; set; }
        public int IdArea { get; set; }
        public int? IdSubArea { get; set; }
        public int IdLine { get; set; }
        public int IdMachine { get; set; }
        public int? IdComponent { get; set; }
        public int IdTechniqueCategory { get; set; }
        public Guid IdEnterprise { get; set; }
    }
}
