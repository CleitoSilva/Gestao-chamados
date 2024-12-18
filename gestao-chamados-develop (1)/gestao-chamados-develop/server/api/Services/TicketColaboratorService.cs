using api.Base;
using api.Interfaces.Repositories;
using api.Interfaces;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using api.Validations;
using server.Dto;
using Microsoft.AspNetCore.Mvc;

namespace api.Services
{
    public class TicketColaboratorService : BaseService, ITicketColaboratorService
    {
        private readonly ITicketColaboratorRepository _ticketColaboratorRepository;
        private readonly IEventService _eventService;
        private readonly ITicketService _ticketService;

        public TicketColaboratorService(ITicketColaboratorRepository ticketColaboratorRepository, IEventService eventService, ITicketService ticketService, IUnitOfWork uow, INotificator notificator) : base(uow, notificator)
        {
            _ticketColaboratorRepository = ticketColaboratorRepository;
            _eventService = eventService;
            _ticketService = ticketService;
        }

        public async Task<IEnumerable<TicketColaborator>> GetAll()
        {
            return await _ticketColaboratorRepository.GetAll();
        }

        public async Task<IEnumerable<TicketColaborator>> GetAllByTicketWithColaborator(int idTicket)
        {
            return await _ticketColaboratorRepository.GetAllByTicketWithColaborator(idTicket);
        }

        public async Task<TicketColaborator?> GetById(int idColaborator, int idTicket)
        {
            return await _ticketColaboratorRepository.GetById(idColaborator, idTicket);
        }

        public async Task<bool> Add(int idColaborator, int idTicket)
        {
            try
            {
                var ticketColaborator = new TicketColaborator
                {
                    IdColaborator = idColaborator,
                    IdTicket = idTicket
                };

                if (ticketColaborator == null)
                {
                    AddNotification("Relação ticket-colaborador fornecida é nula");
                    return false;
                }

                await _ticketColaboratorRepository.Add(ticketColaborator);

                return await _eventService.AddNewColaboratorEvent(idTicket, idColaborator);
            } 
            catch (Exception ex)
            {
                AddNotification("Exceção gerada ao adicionar a relação de ticket e colaborador" + ex.Message);
                return false;
            }
        }

        public async Task<bool> Update(TicketColaborator ticketColaborator)
        {
            if (ticketColaborator == null)
            {
                AddNotification("Relação ticket-colaborador fornecida é nula");
                return false;
            }

            _ticketColaboratorRepository.Update(ticketColaborator);

            return await PersistChanges();
        }

        public async Task<bool> Remove(int idColaborator, int idTicket)
        {
            var ticket = await _ticketService.GetById(idTicket);

            if (ticket != null && ticket.IdResponsibleManutentor == idColaborator)
            {
                AddNotification("Não é possível remover o colaborador responsável do chamado");
                return false;
            }

            var ticketColaborator = await _ticketColaboratorRepository.GetById(idColaborator, idTicket);

            if (ticketColaborator == null)
            {
                AddNotification("Não existe relação ticket-colaborador com esse Id.");
                return false;
            }

            _ticketColaboratorRepository.Remove(ticketColaborator);

            return await _eventService.AddRemoveColaboratorEvent(idTicket, idColaborator);
        }
    }
}
