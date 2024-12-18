using api.Base;
using api.Helpers.Enums;
using api.Interfaces.Repositories;
using api.Interfaces;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using api.Validations;
using server.Dto;
using api.Dto.Events;

namespace api.Services
{
    public class EventService : BaseService, IEventService
    {
        private readonly IEventRepository _eventRepository;
        private readonly ITicketRepository _ticketRepository;
        private readonly IColaboratorRepository _colaboratorRepository;
        private readonly ITechniqueCategoryRepository _techniqueCategoryRepository;
        public EventService(
            IEventRepository eventRepository, 
            ITicketRepository ticketRepository, 
            IColaboratorRepository colaboratorRepository, 
            ITechniqueCategoryRepository techniqueCategoryRepository,
            IUnitOfWork uow, 
            INotificator notificator
            ) : base(uow, notificator)
        {
            _eventRepository = eventRepository;
            _ticketRepository = ticketRepository;
            _colaboratorRepository = colaboratorRepository;
            _techniqueCategoryRepository = techniqueCategoryRepository;
        }

        public async Task<IEnumerable<Event>> GetAll()
        {
            return await _eventRepository.GetAll();
        }

        public async Task<IEnumerable<Event>> GetAllByTicket(int idTicket)
        {
            return await _eventRepository.GetAllByTicket(idTicket);
        }

        public async Task<Event?> GetById(int id)
        {
            return await _eventRepository.GetById(id);
        }

        public async Task<bool> AddOpenEvent(int idTicket)
        {
            try
            {
                var ticket = await _ticketRepository.GetByIdWithOpenEntities(idTicket);

                if (ticket == null)
                {
                    throw new Exception("Chamado não encontrado");
                }

                var eventOpen = new EventOpen
                {
                    OpenBy = ticket.OpenColaborator != null ? ticket.OpenColaborator.Name : "",
                    AreaFor = ticket.Area != null ? ticket.Area.Name : "",
                    SubAreaFor = ticket.SubArea != null ? ticket.SubArea.Name : "",
                    LineFor = ticket.Line != null ? ticket.Line.Name : "",
                    MachineFor = ticket.Machine != null ? ticket.Machine.Name : "",
                    ComponentFor = ticket.Component != null ? ticket.Component.Name : "",
                    TechniqueCategoryAsked = ticket.TechniqueCategory != null ? ticket.TechniqueCategory.Name : ""
                };

                var eventMsg = new Event
                {
                    Id = 0,
                    Code = (int)EventCodes.OPEN,
                    Name = "Chamado aberto",
                    Timestamp = DateTime.UtcNow,
                    Message = eventOpen.ToString(),
                    IdTicket = ticket.Id
                };

                return await Add(eventMsg);
            } 
            catch (Exception ex)
            {
                AddNotification(ex.Message);
                return false;
            }
        }

        public async Task<bool> AddStartRunEvent(int idTicket, int lastStatus)
        {
            try
            {
                var eventChangeStatus = new EventChangeStatus
                {
                    LastStatus = lastStatus,
                    NewStatus = (int)TicketStatus.RUNNING
                };

                var eventMsg = new Event
                {
                    Id = 0,
                    Code = (int)EventCodes.STARTRUN,
                    Name = "Chamado em atendimento",
                    Timestamp = DateTime.UtcNow,
                    Message = eventChangeStatus.ToString(),
                    IdTicket = idTicket
                };

                return await Add(eventMsg);
            }
            catch (Exception ex)
            {
                AddNotification(ex.Message);
                return false;
            }
        }

        public async Task<bool> AddChangeResponsibleEvent(int idTicket, int? idLastResponsible, int idNewResponsible)
        {
            try
            {
                var lastResponsible = await _colaboratorRepository.GetByIdNoTracking(idLastResponsible.GetValueOrDefault());
                var newResponsible = await _colaboratorRepository.GetByIdNoTracking(idNewResponsible);

                var eventChangeResponsible = new EventChangeResponsible
                {
                    LastResponsible = lastResponsible != null ? lastResponsible.Name : "None",
                    NewResponsible = newResponsible != null ? newResponsible.Name : ""
                };

                var eventMsg = new Event
                {
                    Id = 0,
                    Code = (int)EventCodes.CHANGERESPONSIBLE,
                    Name = "Novo responsável técnico",
                    Timestamp = DateTime.UtcNow,
                    Message = eventChangeResponsible.ToString(),
                    IdTicket = idTicket
                };

                return await Add(eventMsg);
            }
            catch (Exception ex)
            {
                AddNotification(ex.Message);
                return false;
            }
        }

        public async Task<bool> AddNewColaboratorEvent(int idTicket, int idColaborator)
        {
            try
            {
                var colaborator = await _colaboratorRepository.GetByIdNoTracking(idColaborator);

                if (colaborator == null)
                {
                    throw new Exception("Colaborador não encontrado");
                }

                var eventColaborator = new EventColaborator
                {
                    Name = colaborator.Name,
                    TechniqueCategory = colaborator.TechniqueCategory != null ? colaborator.TechniqueCategory.Name : "Categoria Técnica não encontrada"
                };

                var eventMsg = new Event
                {
                    Id = 0,
                    Code = (int)EventCodes.NEWCOLABORATOR,
                    Name = "Novo técnico ao chamado",
                    Timestamp = DateTime.UtcNow,
                    Message = eventColaborator.ToString(),
                    IdTicket = idTicket
                };

                return await Add(eventMsg);
            }
            catch (Exception ex)
            {
                AddNotification(ex.Message);
                return false;
            }
        }

        public async Task<bool> AddRemoveColaboratorEvent(int idTicket, int idColaborator)
        {
            try
            {
                var colaborator = await _colaboratorRepository.GetByIdNoTracking(idColaborator);

                if (colaborator == null)
                {
                    throw new Exception("Colaborador não encontrado");
                }

                var eventColaborator = new EventColaborator
                {
                    Name = colaborator.Name,
                    TechniqueCategory = colaborator.TechniqueCategory != null ? colaborator.TechniqueCategory.Name : "Categoria Técnica não encontrada"
                };

                var eventMsg = new Event
                {
                    Id = 0,
                    Code = (int)EventCodes.REMOVECOLABORATOR,
                    Name = "Remoção de colaborador ao chamado",
                    Timestamp = DateTime.UtcNow,
                    Message = eventColaborator.ToString(),
                    IdTicket = idTicket
                };

                return await Add(eventMsg);
            }
            catch (Exception ex)
            {
                AddNotification(ex.Message);
                return false;
            }
        }

        public async Task<bool> AddNewTechEspecialityEvent(int idTicket, int idTechCategory, int status)
        {
            try
            {
                var techCategory = await _techniqueCategoryRepository.GetByIdWithAreaNoTracking(idTechCategory);

                if (techCategory == null)
                {
                    throw new Exception("Especialidade técnica não existe");
                }

                var eventTech = new EventTechnique
                {
                    NameTech = techCategory.Name,
                    AreaTech = techCategory.AreaLocationCover != null ? techCategory.AreaLocationCover.Name : "Área de abrangência não encontrada",
                    StatusTech = status
                };

                var eventMsg = new Event
                {
                    Id = 0,
                    Code = (int)EventCodes.NEWESPECIALITY,
                    Name = "Novo especialidade técnica ao chamado",
                    Timestamp = DateTime.UtcNow,
                    Message = eventTech.ToString(),
                    IdTicket = idTicket
                };

                return await Add(eventMsg);
            }
            catch (Exception ex)
            {
                AddNotification(ex.Message);
                return false;
            }
        }

        public async Task<bool> AddRemoveTechEspecialityEvent(int idTicket, int idTechCategory)
        {
            try
            {
                var techCategory = await _techniqueCategoryRepository.GetByIdWithAreaNoTracking(idTechCategory);

                if (techCategory == null)
                {
                    throw new Exception("Especialidade técnica não existe");
                }

                var eventTech = new EventTechnique
                {
                    NameTech = techCategory.Name,
                    AreaTech = techCategory.AreaLocationCover != null ? techCategory.AreaLocationCover.Name : "Área de abrangência não encontrada"
                };

                var eventMsg = new Event
                {
                    Id = 0,
                    Code = (int)EventCodes.REMOVEESPECIALITY,
                    Name = "Remoção de especialidade técnica ao chamado",
                    Timestamp = DateTime.UtcNow,
                    Message = eventTech.ToString(),
                    IdTicket = idTicket
                };

                return await Add(eventMsg);
            }
            catch (Exception ex)
            {
                AddNotification(ex.Message);
                return false;
            }
        }

        public async Task<bool> Add(Event eventMsg)
        {
            if (eventMsg == null)
            {
                AddNotification("Evento fornecido é nulo");
                return false;
            }

            if (!ValidateObject<Event>(new EventValidation(), eventMsg))
            {
                return false;
            }

            await _eventRepository.Add(eventMsg);

            return await PersistChanges();
        }

        public async Task<bool> Update(Event eventMsg)
        {
            if (eventMsg == null)
            {
                AddNotification("Evento fornecido é nulo");
                return false;
            }

            if (!ValidateObject<Event>(new EventValidation(), eventMsg))
            {
                return false;
            }

            _eventRepository.Update(eventMsg);

            return await PersistChanges();
        }

        public async Task<bool> Remove(int eventMsgId)
        {
            var eventMsg = await _eventRepository.GetById(eventMsgId);

            if (eventMsg == null)
            {
                AddNotification("Não existe evento com esse Id.");
                return false;
            }

            _eventRepository.Remove(eventMsg);

            return await PersistChanges();
        }
    }
}
