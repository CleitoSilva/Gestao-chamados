using api.Base;
using api.Dto.Events;
using api.Dto.Tickets;
using api.Helpers.Enums;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Dto;

namespace api.Controllers
{
    [Route("api/tickets")]
    [ApiController]
    public class TicketsController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly ITicketService _ticketService;
        private readonly IEventService _eventService;
        private readonly ITicketColaboratorService _ticketColaboratorService;
        private readonly ITicketTechniqueService _ticketTechniqueService;
        private readonly IColaboratorService _colaboratorService;
        private readonly ICurrentUserService _currentUserService;

        public TicketsController(
            IMapper mapper,
            ITicketService ticketService,
            IEventService eventService,
            ITicketColaboratorService ticketColaboratorService,
            ITicketTechniqueService ticketTechniqueService,
            IColaboratorService colaboratorService,
            ICurrentUserService currentUserService,
            INotificator notificator
            ) : base(notificator)
        {
            _mapper = mapper;
            _ticketService = ticketService;
            _eventService = eventService;
            _ticketColaboratorService = ticketColaboratorService;
            _ticketTechniqueService = ticketTechniqueService;
            _colaboratorService = colaboratorService;
            _currentUserService = currentUserService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var tickets = await _ticketService.GetAll();

            return Ok(SuccessBehavior("Lista completa de chamados", tickets));
        }

        [HttpGet("{ticketId}")]
        public async Task<IActionResult> GetById(int ticketId)
        {
            var ticket = await _ticketService.GetByIdWithEventsAndColaboratorsNoTracking(ticketId);

            return Ok(SuccessBehavior($"Chamado com Id: {ticketId}", ticket));
        }

        [HttpGet("status/{ticketId}")]
        public async Task<IActionResult> GetStatusById(int ticketId)
        {
            var ticket = await _ticketService.GetByIdNoTracking(ticketId);

            var statusTicket = _mapper.Map<TicketOnlyStatus>(ticket);

            return Ok(SuccessBehavior($"Status do Chamado com Id: {ticketId}", statusTicket));
        }

        [HttpGet("events/{ticketId}")]
        public async Task<IActionResult> GetEventsById(int ticketId)
        {
            var events = await _eventService.GetAllByTicket(ticketId);

            return Ok(SuccessBehavior("Lista completa de eventos do chamado", events));
        }

        [HttpGet("techniques/{ticketId}")]
        public async Task<IActionResult> GetTechniquesById(int ticketId)
        {
            var events = await _ticketTechniqueService.GetAllByTicket(ticketId);

            return Ok(SuccessBehavior("Lista completa de categorias do chamado", events));
        }

        [HttpGet("colaborators/{ticketId}")]
        public async Task<IActionResult> GetColaboratorsById(int ticketId)
        {
            var events = await _ticketColaboratorService.GetAllByTicketWithColaborator(ticketId);

            return Ok(SuccessBehavior("Lista completa de colaboradores do chamado", events));
        }

        [HttpGet("paginate")]
        public async Task<IActionResult> GetPaginate([FromQuery] int page = 1, [FromQuery] int take = 10, [FromQuery] TicketFilter? filter = null)
        {
            var tickets = await _ticketService.GetPaginate(page, take, filter);

            return Ok(SuccessBehavior("Chamados Páginados", tickets));
        }

        [Authorize]
        [HttpGet("my-tickets")]
        public async Task<IActionResult> GetMyTickets()
        {
            try
            {
                var userName = _currentUserService.GetUserName();

                if (userName == null) return Unauthorized();

                var myTickets = await _ticketService.GetAllLiveByUserCreate(userName);

                return Ok(SuccessBehavior("Chamados abertos por mim", myTickets));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpGet("by-area/{techId}")]
        public async Task<IActionResult> GetTechAreaTickets(int techId)
        {
            try
            {
                var areaTickets = await _ticketService.GetAllLiveByTechCategory(techId);

                return Ok(SuccessBehavior("Chamados abertos para área técnica", areaTickets));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TicketCreate ticketIn)
        {
            try
            {
                var ticket = _mapper.Map<Ticket>(ticketIn);

                var saved = await _ticketService.Add(ticket);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel criar o chamado no banco de dados.");
                    throw new Exception();
                }

                await _eventService.AddOpenEvent(ticket.Id);

                await _ticketTechniqueService.Add(ticketIn.IdTechniqueCategory, ticket.Id, (int)TechStatus.WAITING);

                return Ok(SuccessBehavior("Chamado criado com sucesso", ticket));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        //private void UpdateTicket(Ticket ticket, TicketUpdate ticketIn)
        //{
        //    ticket.Name = ticketIn.Name;
        //    ticket.BadgeCardNumber = ticketIn.BadgeCardNumber;
        //    ticket.RFIDCardNumber = ticketIn.RFIDCardNumber;
        //    ticket.RENumber = ticketIn.RENumber;
        //    ticket.IdTicketCategory = ticketIn.IdTicketCategory;
        //    ticket.IdTechniqueCategory = ticketIn.IdTechniqueCategory;
        //    ticket.IdShift = ticketIn.IdShift;
        //    ticket.IdLine = ticketIn.IdLine;
        //}

        [Authorize]
        [HttpPatch("start")]
        public async Task<IActionResult> UpdateStart([FromBody] TicketResponsible ticketStart)
        {
            try
            {
                var ticket = await _ticketService.GetById(ticketStart.Id);

                if (ticket == null)
                {
                    AddNotification("Ticket não encontrado.");
                    throw new Exception();
                }

                if (ticket.Status != (int)TicketStatus.OPEN)
                {
                    AddNotification("Não é possível startar o chamado, pois ele já foi startado!");
                    throw new Exception();
                }

                var lastStatus = ticket.Status;
                var lastResponsible = ticket.IdResponsibleManutentor;

                ticket.IdResponsibleManutentor = ticketStart.IdResponsibleManutentor;
                ticket.Status = (int)TicketStatus.RUNNING;

                var saved = await _ticketService.Update(ticket);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar o chamado no banco de dados.");
                    throw new Exception();
                }

                await _eventService.AddChangeResponsibleEvent(ticketStart.Id, lastResponsible, ticketStart.IdResponsibleManutentor);
                await _ticketColaboratorService.Add(ticketStart.IdResponsibleManutentor, ticketStart.Id);

                await _eventService.AddStartRunEvent(ticketStart.Id, lastStatus);

                await AlterTechEspeciality(ticketStart.IdResponsibleManutentor, ticketStart.Id);

                return Ok(SuccessBehavior("Chamado iniciado com sucesso", ticket));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }


        [Authorize]
        [HttpPatch("responsible")]
        public async Task<IActionResult> UpdateResponsible([FromBody] TicketResponsible ticketResponsible)
        {
            try
            {
                var ticket = await _ticketService.GetById(ticketResponsible.Id);

                if (ticket == null)
                {
                    AddNotification("Ticket não encontrado.");
                    throw new Exception();
                }

                var lastResponsible = ticket.IdResponsibleManutentor;

                ticket.IdResponsibleManutentor = ticketResponsible.IdResponsibleManutentor;

                var saved = await _ticketService.Update(ticket);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar o chamado no banco de dados.");
                    throw new Exception();
                }

                await _eventService.AddChangeResponsibleEvent(ticketResponsible.Id, lastResponsible, ticketResponsible.IdResponsibleManutentor);

                return Ok(SuccessBehavior("Responsável do chamado alterado", ticket));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }



        [Authorize]
        [HttpPatch("pause")]
        public async Task<IActionResult> UpdatePause([FromBody] TicketSimple ticketSimple)
        {
            try
            {
                var ticket = await _ticketService.GetById(ticketSimple.Id);

                if (ticket == null)
                {
                    AddNotification("Ticket não encontrado." + ticketSimple.Id);
                    throw new Exception();
                }

                if (ticket.Status == (int)TicketStatus.FINISH)
                {
                    AddNotification("Chamado já foi finalizado, não é possível pausá-lo!");
                    throw new Exception();
                }

                if (ticket.Status == (int)TicketStatus.OPEN)
                {
                    AddNotification("Chamado não foi inicializado, não é possível pausá-lo!");
                    throw new Exception();
                }

                if (ticket.Status == (int)TicketStatus.PAUSED)
                {
                    AddNotification("Chamado já foi pausado, não é possível pausá-lo novamente!");
                    throw new Exception();
                }

                var eventStatus = new EventChangeStatus
                {
                    LastStatus = ticket.Status,
                    NewStatus = (int)TicketStatus.PAUSED,
                };

                var newEvent = new Event
                {
                    Id = 0,
                    Code = (int)EventCodes.PAUSE,
                    Name = "Chamado Pausado",
                    Timestamp = DateTime.UtcNow,
                    Message = eventStatus.ToString(),
                    IdTicket = ticket.Id
                };

                ticket.Status = (int)TicketStatus.PAUSED;

                await CalcTicketTime(ticket, newEvent);

                var saved = await _ticketService.Update(ticket);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar o chamado no banco de dados.");
                    throw new Exception();
                }

                await _eventService.Add(newEvent);

                return Ok(SuccessBehavior("Chamado pausado com sucesso", ticket));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpPatch("reinitialize")]
        public async Task<IActionResult> UpdateReinicialize([FromBody] TicketSimple ticketSimple)
        {
            try
            {
                var ticket = await _ticketService.GetById(ticketSimple.Id);

                if (ticket == null)
                {
                    AddNotification("Ticket não encontrado.");
                    throw new Exception();
                }

                if (ticket.Status == (int)TicketStatus.FINISH)
                {
                    AddNotification("Chamado já foi finalizado, não é possível reiniciá-lo!");
                    throw new Exception();
                }

                if (ticket.Status == (int)TicketStatus.OPEN)
                {
                    AddNotification("Chamado não foi inicializado, não é possível reiniciá-lo!");
                    throw new Exception();
                }

                if (ticket.Status == (int)TicketStatus.RUNNING)
                {
                    AddNotification("Chamado já está em atendimento, não é possível iniciá-lo novamente!");
                    throw new Exception();
                }

                var eventStatus = new EventChangeStatus
                {
                    LastStatus = ticket.Status,
                    NewStatus = (int)TicketStatus.RUNNING,
                };

                var newEvent = new Event
                {
                    Id = 0,
                    Code = (int)EventCodes.REINITIALIZE,
                    Name = "Chamado reiniciado",
                    Timestamp = DateTime.UtcNow,
                    Message = eventStatus.ToString(),
                    IdTicket = ticket.Id
                };

                ticket.Status = (int)TicketStatus.RUNNING;

                await CalcTicketTime(ticket, newEvent);

                var saved = await _ticketService.Update(ticket);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar o chamado no banco de dados.");
                    throw new Exception();
                }

                await _eventService.Add(newEvent);

                return Ok(SuccessBehavior("Chamado reiniciado com sucesso", ticket));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpPatch("cancel")]
        public async Task<IActionResult> UpdateCancel([FromBody] TicketSimple ticketSimple)
        {
            try
            {
                var ticket = await _ticketService.GetById(ticketSimple.Id);

                if (ticket == null)
                {
                    AddNotification("Ticket não encontrado.");
                    throw new Exception();
                }

                if (ticket.Status == (int)TicketStatus.FINISH)
                {
                    AddNotification("Chamado já foi finalizado, não é possível cancela-lo!");
                    throw new Exception();
                }

                if (ticket.Status == (int)TicketStatus.OPEN)
                {
                    AddNotification("Chamado não foi inicializado, não é possível cancelá-lo! Ao invés disso, exclua o chamado!");
                    throw new Exception();
                }

                if (ticket.Status == (int)TicketStatus.CANCELED)
                {
                    AddNotification("Chamado já foi cancelado, não é possível cancelá-lo novamente!");
                    throw new Exception();
                }

                var eventStatus = new EventChangeStatus
                {
                    LastStatus = ticket.Status,
                    NewStatus = (int)TicketStatus.CANCELED,
                };

                var newEvent = new Event
                {
                    Id = 0,
                    Code = (int)EventCodes.CANCELED,
                    Name = "Chamado cancelado",
                    Timestamp = DateTime.UtcNow,
                    Message = eventStatus.ToString(),
                    IdTicket = ticket.Id
                };

                ticket.Status = (int)TicketStatus.CANCELED;

                await CalcTicketTime(ticket, newEvent);

                var saved = await _ticketService.Update(ticket);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar o chamado no banco de dados.");
                    throw new Exception();
                }

                await _eventService.Add(newEvent);

                return Ok(SuccessBehavior("Chamado cancelado com sucesso", ticket));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        private async Task CalcTicketTime(Ticket ticket, Event lastEvent)
        {
            try
            {
                HashSet<int> targetCodes = new HashSet<int> { (int)EventCodes.FINISH, (int)EventCodes.CANCELED, (int)EventCodes.PAUSE };
                HashSet<int> startRunCodes = new HashSet<int> { (int)EventCodes.REINITIALIZE, (int)EventCodes.STARTRUN };

                var eventsEnumerable = await _eventService.GetAllByTicket(ticket.Id);

                List<Event> events = eventsEnumerable.ToList();

                events.Add(lastEvent);

                int idxRef = 1;

                while (idxRef < events.Count() && events.ElementAt(idxRef).Code != (int)EventCodes.STARTRUN) idxRef++;

                TimeSpan diffWaiting = events.ElementAt(idxRef).Timestamp - events.First().Timestamp;

                ticket.TotalWaitingTechnicalTime = diffWaiting.TotalSeconds;

                TimeSpan diffTotal = events.Last().Timestamp - events.First().Timestamp;

                ticket.TotalTicketTime = diffTotal.TotalSeconds;

                int i = idxRef + 1;
                double diffServiceTime = 0;

                while (i < events.Count())
                {
                    while (i < events.Count() && !targetCodes.Contains(events.ElementAt(i).Code))
                    {
                        i++;
                    }

                    diffServiceTime += (events.ElementAt(i).Timestamp - events.ElementAt(idxRef).Timestamp).TotalSeconds;

                    idxRef = i + 1;

                    while (idxRef < events.Count() && !startRunCodes.Contains(events.ElementAt(idxRef).Code)) {
                        idxRef++;
                    }

                    i = idxRef + 1;
                }

                ticket.TotalServiceTime = diffServiceTime;
            }
            catch (Exception ex)
            {
                AddNotification("Ocorreu um erro no cálculo do tempo decorrido. Mensagem de erro: " + ex.Message);
            }
        }

        [Authorize]
        [HttpPatch("finish")]
        public async Task<IActionResult> UpdateFinish([FromBody] TicketSimple ticketSimple)
        {
            try
            {
                var ticket = await _ticketService.GetById(ticketSimple.Id);

                if (ticket == null)
                {
                    AddNotification("Ticket não encontrado.");
                    throw new Exception();
                }

                if (ticket.Status == (int)TicketStatus.FINISH)
                {
                    AddNotification("Chamado já foi finalizado, não é possível finalizá-lo novamente!");
                    throw new Exception();
                }

                if (ticket.Status == (int)TicketStatus.OPEN)
                {
                    AddNotification("Chamado não foi inicializado, não é possível finalizá-lo!");
                    throw new Exception();
                }

                var eventStatus = new EventChangeStatus
                {
                    LastStatus = ticket.Status,
                    NewStatus = (int)TicketStatus.FINISH,
                };

                var newEvent = new Event
                {
                    Id = 0,
                    Code = (int)EventCodes.FINISH,
                    Name = "Chamado finalizado",
                    Timestamp = DateTime.UtcNow,
                    Message = eventStatus.ToString(),
                    IdTicket = ticket.Id
                };

                ticket.Status = (int)TicketStatus.FINISH;

                await CalcTicketTime(ticket, newEvent);

                var saved = await _ticketService.Update(ticket);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar o chamado no banco de dados.");
                    throw new Exception();
                }

                await _eventService.Add(newEvent);

                return Ok(SuccessBehavior("Chamado finalizado com sucesso", ticket));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        private async Task AlterTechEspeciality(int idColaborator, int idTicket)
        {
            try
            {
                var colaborator = await _colaboratorService.GetById(idColaborator);

                if (colaborator == null)
                {
                    return;
                }

                var ticketTech = await _ticketTechniqueService.GetById(colaborator.IdTechniqueCategory, idTicket);

                if (ticketTech != null)
                {
                    ticketTech.ServiceStatus = (int)TechStatus.ONSERVICE;

                    await _ticketTechniqueService.Update(ticketTech);
                }
            }
            catch (Exception ex)
            {
                AddNotification("Ocorreu um erro ao alterar o status da especialidade: " + ex.Message);
            }
        }

        [Authorize]
        [HttpPatch("colaborator")]
        public async Task<IActionResult> UpdateColaborator([FromBody] TicketAlterColaborator ticketColaborator)
        {
            try
            {
                var saved = await _ticketColaboratorService.Add(ticketColaborator.IdColaborator, ticketColaborator.Id);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel adicionar o colaborador no banco de dados.");
                    throw new Exception();
                }

                await AlterTechEspeciality(ticketColaborator.IdColaborator, ticketColaborator.Id);

                return Ok(SuccessBehavior("Colaborador adicionado ao chamado com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        private async Task AlterVerifyServiceTechEspeciality(int idColaborator, int idTicket)
        {
            try
            {
                var colaborator = await _colaboratorService.GetById(idColaborator);

                if (colaborator == null)
                {
                    return;
                }

                var colaborators = await _ticketColaboratorService.GetAllByTicketWithColaborator(idTicket);
                var hasOther = false;

                foreach (var tc in colaborators)
                {
                    if (tc.Colaborator != null && tc.Colaborator.IdTechniqueCategory == colaborator.IdTechniqueCategory)
                    {
                        hasOther = true;
                        break;
                    }
                }

                if (!hasOther)
                {
                    var ticketTech = await _ticketTechniqueService.GetById(colaborator.IdTechniqueCategory, idTicket);

                    if (ticketTech != null)
                    {
                        ticketTech.ServiceStatus = (int)TechStatus.EVERYBODYLEAVE;

                        await _ticketTechniqueService.Update(ticketTech);
                    }
                }
            }
            catch (Exception ex)
            {
                AddNotification("Ocorreu um erro ao verificar o status da especialidade: " + ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("colaborator")]
        public async Task<IActionResult> RemoveColaborator([FromBody] TicketAlterColaborator ticketColaborator)
        {
            try
            {
                var saved = await _ticketColaboratorService.Remove(ticketColaborator.IdColaborator, ticketColaborator.Id);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel remover o colaborador no banco de dados.");
                    throw new Exception();
                }

                await AlterVerifyServiceTechEspeciality(ticketColaborator.IdColaborator, ticketColaborator.Id);

                return Ok(SuccessBehavior("Colaborador removido do chamado com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        private async Task<int> CheckIfHasColaborator(int idTechCategory, int idTicket)
        {
            try
            {
                var colaborators = await _ticketColaboratorService.GetAllByTicketWithColaborator(idTicket);

                foreach (var tc in colaborators)
                {
                    if (tc.Colaborator != null && tc.Colaborator.IdTechniqueCategory == idTechCategory)
                    {
                        return (int)TechStatus.ONSERVICE;
                    }
                }

                return (int)TechStatus.WAITING;
            }
            catch (Exception ex)
            {
                AddNotification("Erro ao verificar o status da especialidade técnica: " + ex.Message);
                return (int)TechStatus.WAITING;
            }
        }

        [Authorize]
        [HttpPatch("especiality")]
        public async Task<IActionResult> UpdateTechnique([FromBody] TicketAlterTechnique ticketTechnique)
        {
            try
            {
                var techStatus = await CheckIfHasColaborator(ticketTechnique.IdTechCategory, ticketTechnique.IdTicket);

                var saved = await _ticketTechniqueService.Add(ticketTechnique.IdTechCategory, ticketTechnique.IdTicket, techStatus);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel adicionar o colaborador no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Especialidade adicionada ao chamado com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("especiality")]
        public async Task<IActionResult> RemoveTechnique([FromBody] TicketAlterTechnique ticketTechnique)
        {
            try
            {
                var saved = await _ticketTechniqueService.Remove(ticketTechnique.IdTechCategory, ticketTechnique.IdTicket);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel remover a especialidade no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Especialidade removida do chamado com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        //Tabela de chamados ativos
        [Authorize]
        [HttpGet("tickets-workshop")]
        public async Task<IActionResult> GetTicketsWorkshop([FromQuery] int idTechniqueCategory, [FromQuery] int page = 1, [FromQuery] int take = 10, [FromQuery] TicketFilter? filter = null)
        {
            try
            {
                var saved = await _ticketService.GetPaginateWorkshop(page, take, filter, idTechniqueCategory);
                var paginate_workshop = new Paginate<TicketWorkshop>()
                {
                    Items = _mapper.Map<List<TicketWorkshop>>(saved.Items),
                    PagesCount = saved.PagesCount,
                    PageSize = saved.PageSize,
                    PageIndex = saved.PageIndex,
                    ItemsCount = saved.ItemsCount
                };
                return Ok(SuccessBehavior("Tickts da oficina chamados com sucesso", paginate_workshop));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }
    }
}
