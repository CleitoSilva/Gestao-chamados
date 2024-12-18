namespace api.Dto.Tickets
{
    public class TicketFilter
    {
        public int? status { get; set; }
        public int? colaborator { get; set; }
        public int? responsible { get; set; }
        public int? area { get; set; }
        public int? subarea { get; set; }
        public int? line { get; set; }
        public int? machine { get; set; }
        public int? component { get; set; }
        public int? technique { get; set; }

        public DateTime? createdDate { get; set; }
        public Guid? enterprise { get; set; }
    }
}
