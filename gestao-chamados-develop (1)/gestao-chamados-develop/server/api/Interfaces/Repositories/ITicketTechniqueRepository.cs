using api.Models;
using System.Linq.Expressions;

namespace api.Interfaces.Repositories
{
    public interface ITicketTechniqueRepository
    {
        Task Add(TicketTechnique ticketTechnique);
        void Update(TicketTechnique ticketTechnique);
        void Remove(TicketTechnique ticketTechnique);
        Task<TicketTechnique?> GetById(int idTechnique, int idTicket);
        Task<IEnumerable<TicketTechnique>> GetAll();
        Task<IEnumerable<TicketTechnique>> GetAllByTicket(int idTicket);
        Task<IEnumerable<TicketTechnique>> Search(Expression<Func<TicketTechnique, bool>> predicate);
    }
}
