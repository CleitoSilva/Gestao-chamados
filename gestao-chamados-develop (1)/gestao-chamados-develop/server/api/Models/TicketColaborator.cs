using api.Base;

namespace api.Models
{
    public class TicketColaborator : Entity
    {
        public int IdColaborator { get; set; }
        public int IdTicket { get; set; }

        public Colaborator? Colaborator { get; set; }
        public Ticket? Ticket { get; set; }
    }
}
