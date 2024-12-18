using api.Models;
using server.Dto;
using System.Linq.Expressions;

namespace api.Interfaces.Repositories
{
    public interface ITicketColaboratorRepository
    {
        Task Add(TicketColaborator ticketColaborator);
        void Update(TicketColaborator ticketColaborator);
        void Remove(TicketColaborator ticketColaborator);
        Task<TicketColaborator?> GetById(int idColaborator, int idTicket);
        Task<IEnumerable<TicketColaborator>> GetAll();
        Task<IEnumerable<TicketColaborator>> GetAllByTicketWithColaborator(int idTicket);
        Task<IEnumerable<TicketColaborator>> Search(Expression<Func<TicketColaborator, bool>> predicate);
    }
}
