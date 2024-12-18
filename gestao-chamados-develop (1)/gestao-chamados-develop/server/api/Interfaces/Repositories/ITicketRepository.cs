using api.Dto.TechniqueCategories;
using api.Dto.Tickets;
using api.Models;
using server.Dto;
using System.Linq.Expressions;

namespace api.Interfaces.Repositories
{
    public interface ITicketRepository
    {
        Task Add(Ticket ticket);
        void Update(Ticket ticket);
        void Remove(Ticket ticket);
        Task<Ticket?> GetById(int id);
        Task<Ticket?> GetByIdForRemove(int id);
        Task<Ticket?> GetByIdNoTracking(int id);
        Task<Ticket?> GetByIdWithEventsAndColaboratorsNoTracking(int id);
        Task<Ticket?> GetByIdWithOpenEntities(int id);
        Task<IEnumerable<Ticket>> GetAll();
        Task<IEnumerable<Ticket>> GetAllLiveByUserCreate(string userName);
        Task<IEnumerable<Ticket>> GetAllLiveByTechCategory(int idTechCategory);
        Task<Paginate<Ticket>> GetPaginate(int page, int take, TicketFilter? filter);
        Task<Paginate<Ticket>> GetPaginateWorkshop(int page, int take, TicketFilter? filter, int idTechniqueCategory);
        Task<IEnumerable<Ticket>> Search(Expression<Func<Ticket, bool>> predicate);
    }
}
