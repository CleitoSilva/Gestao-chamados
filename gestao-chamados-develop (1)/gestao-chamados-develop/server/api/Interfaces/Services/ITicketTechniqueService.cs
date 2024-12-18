using api.Models;

namespace api.Interfaces.Services
{
    public interface ITicketTechniqueService
    {
        Task<Boolean> Add(int idTechnique, int idTicket, int status);
        Task<Boolean> Update(TicketTechnique ticketTechnique);
        Task<Boolean> Remove(int idTechnique, int idTicket);
        Task<TicketTechnique?> GetById(int idTechnique, int idTicket);
        Task<IEnumerable<TicketTechnique>> GetAll();
        Task<IEnumerable<TicketTechnique>> GetAllByTicket(int idTicket);
    }
}
