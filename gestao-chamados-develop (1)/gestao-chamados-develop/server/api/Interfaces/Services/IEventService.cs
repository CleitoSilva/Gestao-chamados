using api.Models;
using server.Dto;

namespace api.Interfaces.Services
{
    public interface IEventService
    {
        Task<Boolean> Add(Event eventMsg);
        Task<Boolean> AddOpenEvent(int idTicket);
        Task<Boolean> AddStartRunEvent(int idTicket, int lastStatus);
        Task<Boolean> AddChangeResponsibleEvent(int idTicket, int? lastResponsible, int newResponsible);
        Task<Boolean> AddNewColaboratorEvent(int idTicket, int idColaborator);
        Task<Boolean> AddRemoveColaboratorEvent(int idTicket, int idColaborator);
        Task<Boolean> AddNewTechEspecialityEvent(int idTicket, int idTechCategory, int status);
        Task<Boolean> AddRemoveTechEspecialityEvent(int idTicket, int idTechCategory);
        Task<Boolean> Update(Event eventMsg);
        Task<Boolean> Remove(int eventMsgId);
        Task<Event?> GetById(int id);
        Task<IEnumerable<Event>> GetAll();
        Task<IEnumerable<Event>> GetAllByTicket(int idTicket);
    }
}
