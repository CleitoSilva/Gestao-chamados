using api.Models;
using server.Dto;

namespace api.Interfaces.Services
{
    public interface ITicketColaboratorService
    {
        Task<Boolean> Add(int idColaborator, int idTicket);
        Task<Boolean> Update(TicketColaborator ticketColaborator);
        Task<Boolean> Remove(int idColaborator, int idTicket);
        Task<TicketColaborator?> GetById(int idColaborator, int idTicket);
        Task<IEnumerable<TicketColaborator>> GetAll();
        Task<IEnumerable<TicketColaborator>> GetAllByTicketWithColaborator(int idTicket);
    }
}
