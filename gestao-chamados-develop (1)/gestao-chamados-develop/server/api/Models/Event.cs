using api.Base;

namespace api.Models
{
    public class Event : Entity
    {
        public int Id { get; set; }
        public int Code { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
        public string Message { get; set; } = string.Empty;
        public int IdTicket { get; set; }

        public Ticket? Ticket { get; set; }
    }
}
