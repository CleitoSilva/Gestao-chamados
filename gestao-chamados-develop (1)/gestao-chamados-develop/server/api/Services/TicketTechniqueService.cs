using api.Base;
using api.Interfaces.Repositories;
using api.Interfaces;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using api.Validations;
using server.Dto;

namespace api.Services
{
    public class TicketTechniqueService : BaseService, ITicketTechniqueService
    {
        private readonly ITicketTechniqueRepository _ticketTechniqueRepository;
        private readonly IEventService _eventService;

        public TicketTechniqueService(ITicketTechniqueRepository ticketTechniqueRepository, IEventService eventService, IUnitOfWork uow, INotificator notificator) : base(uow, notificator)
        {
            _ticketTechniqueRepository = ticketTechniqueRepository;
            _eventService = eventService;
        }

        public async Task<IEnumerable<TicketTechnique>> GetAll()
        {
            return await _ticketTechniqueRepository.GetAll();
        }

        public async Task<IEnumerable<TicketTechnique>> GetAllByTicket(int idTicket)
        {
            return await _ticketTechniqueRepository.GetAllByTicket(idTicket);
        }

        public async Task<TicketTechnique?> GetById(int idTechnique, int idTicket)
        {
            return await _ticketTechniqueRepository.GetById(idTechnique, idTicket);
        }


        public async Task<bool> Add(int idTechnique, int idTicket, int status)
        {
            try
            {
                var ticketTechnique = new TicketTechnique
                {
                    IdTechniqueCategory = idTechnique,
                    IdTicket = idTicket,
                    ServiceStatus = status
                };

                if (ticketTechnique == null)
                {
                    AddNotification("TicketTechnique fornecida é nula");
                    return false;
                }

                await _ticketTechniqueRepository.Add(ticketTechnique);

                return await _eventService.AddNewTechEspecialityEvent(idTicket, idTechnique, status);
            }
            catch (Exception ex)
            {
                AddNotification("Erro ao adicionar a relação chamado e especialidade: " + ex.Message);
                return false;
            }
        }

        public async Task<bool> Update(TicketTechnique ticketTechnique)
        {
            if (ticketTechnique == null)
            {
                AddNotification("TicketTechnique fornecida é nula");
                return false;
            }

            _ticketTechniqueRepository.Update(ticketTechnique);

            return await PersistChanges();
        }

        public async Task<bool> Remove(int idTechnique, int idTicket)
        {
            var ticketTechnique = await _ticketTechniqueRepository.GetById(idTechnique, idTicket);

            if (ticketTechnique == null)
            {
                AddNotification("Não existe ticketTechnique com esse Id.");
                return false;
            }

            _ticketTechniqueRepository.Remove(ticketTechnique);

            return await _eventService.AddRemoveTechEspecialityEvent(idTicket, idTechnique);
        }
    }
}
