using api.Dto.Tickets;
using api.Models;
using server.Dto;

namespace api.Interfaces.Services
{
    public interface ITicketService
    {
        Task<Boolean> Add(Ticket ticket);
        Task<Boolean> Update(Ticket ticket);
        Task<Boolean> Remove(int ticketId);
        Task<Ticket?> GetById(int id);
        Task<Ticket?> GetByIdNoTracking(int id);
        Task<Ticket?> GetByIdWithEventsAndColaboratorsNoTracking(int id);
        Task<Paginate<Ticket>> GetPaginate(int page, int take, TicketFilter? filter);
        Task<IEnumerable<Ticket>> GetAll();
        Task<IEnumerable<Ticket>> GetAllLiveByUserCreate(string userName);
        Task<IEnumerable<Ticket>> GetAllLiveByTechCategory(int idTechCategory);
        Task<Paginate<Ticket>> GetPaginateWorkshop(int page, int take, TicketFilter? filter, int idTechniqueCategory);
    }
}
