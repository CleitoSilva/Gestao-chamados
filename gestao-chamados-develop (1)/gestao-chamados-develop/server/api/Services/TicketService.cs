using api.Base;
using api.Dto.Tickets;
using api.Interfaces.Repositories;
using api.Interfaces;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using api.Validations;
using server.Dto;
using api.Helpers.Enums;

namespace api.Services
{
    public class TicketService : BaseService, ITicketService
    {
        private readonly ITicketRepository _ticketRepository;

        public TicketService(ITicketRepository ticketRepository, IUnitOfWork uow, INotificator notificator) : base(uow, notificator)
        {
            _ticketRepository = ticketRepository;
        }

        public async Task<IEnumerable<Ticket>> GetAll()
        {
            return await _ticketRepository.GetAll();
        }

        public async Task<IEnumerable<Ticket>> GetAllLiveByUserCreate(string userName)
        {
            return await _ticketRepository.GetAllLiveByUserCreate(userName);
        }

        public async Task<IEnumerable<Ticket>> GetAllLiveByTechCategory(int idTechCategory)
        {
            return await _ticketRepository.GetAllLiveByTechCategory(idTechCategory);
        }

        public async Task<Ticket?> GetById(int id)
        {
            return await _ticketRepository.GetById(id);
        }

        public async Task<Ticket?> GetByIdNoTracking(int id)
        {
            return await _ticketRepository.GetByIdNoTracking(id);
        }

        public async Task<Ticket?> GetByIdWithEventsAndColaboratorsNoTracking(int id)
        {
            return await _ticketRepository.GetByIdWithEventsAndColaboratorsNoTracking(id);
        }

        public async Task<Paginate<Ticket>> GetPaginate(int page, int take, TicketFilter? filter)
        {
            return await _ticketRepository.GetPaginate(page, take, filter);
        }

        public async Task<Paginate<Ticket>> GetPaginateWorkshop(int page, int take, TicketFilter? filter, int idTechniqueCategory)
        {
            return await _ticketRepository.GetPaginateWorkshop(page, take, filter, idTechniqueCategory);
        }
        public async Task<bool> Add(Ticket ticket)
        {
            if (ticket == null)
            {
                AddNotification("Chamado fornecido é nulo");
                return false;
            }

            // Zera os valores
            ticket.TotalServiceTime = 0;
            ticket.TotalTicketTime = 0;
            ticket.TotalWaitingTechnicalTime = 0;
            ticket.Status = (int)TicketStatus.OPEN;

            if (!ValidateObject<Ticket>(new TicketValidation(), ticket))
            {
                return false;
            }

            if (_ticketRepository.Search(x => x.Equals(ticket)).Result.Any())
            {
                AddNotification("Já existe um chamado aberto com essas informações");
                return false;
            }

            await _ticketRepository.Add(ticket);

            return await PersistChanges();
        }

        public async Task<bool> Update(Ticket ticket)
        {
            if (ticket == null)
            {
                AddNotification("Chamado fornecido é nulo");
                return false;
            }

            if (!ValidateObject<Ticket>(new TicketValidation(), ticket))
            {
                return false;
            }

            //if (_ticketRepository.Search(x => x.Name == ticket.Name && x.IdEnterprise == ticket.IdEnterprise && x.Id != ticket.Id).Result.Any())
            //{
            //    AddNotification("Já existe um chamado aberto com essas informações");
            //    return false;
            //}

            _ticketRepository.Update(ticket);

            return await PersistChanges();
        }

        public async Task<bool> Remove(int ticketId)
        {
            var ticket = await _ticketRepository.GetByIdForRemove(ticketId);

            if (ticket == null)
            {
                AddNotification("Não existe chamado com esse Id.");
                return false;
            }

            if (ticket.Status != (int)TicketStatus.OPEN)
            {
                AddNotification("Chamado não pode ser removido, já foi inicializado, fechado ou cancelado!");
                return false;
            }

            _ticketRepository.Remove(ticket);

            return await PersistChanges();
        }
    }
}
