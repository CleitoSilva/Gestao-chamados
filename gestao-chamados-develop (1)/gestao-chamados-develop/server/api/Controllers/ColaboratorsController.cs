using api.Base;
using api.Dto.Colaborators;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/colaborators")]
    [ApiController]
    public class ColaboratorsController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IColaboratorService _colaboratorService;

        public ColaboratorsController(IMapper mapper, IColaboratorService colaboratorService, INotificator notificator) : base(notificator)
        {
            _mapper = mapper;
            _colaboratorService = colaboratorService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var colaborators = await _colaboratorService.GetAll();

            return Ok(SuccessBehavior("Lista completa de colaboradores", colaborators));
        }

        [HttpGet("not-in-tickets")]
        public async Task<IActionResult> GetNotInTickets([FromQuery] int idTicket)
        {
            var colaborators = await _colaboratorService.GetAllNotInTicket(idTicket);

            return Ok(SuccessBehavior("Lista de colaboradores fora do chamado", colaborators));
        }

        [HttpGet("{colaboratorId}")]
        public async Task<IActionResult> GetById(int colaboratorId)
        {
            var colaborator = await _colaboratorService.GetById(colaboratorId);

            return Ok(SuccessBehavior($"Colaborador com Id: {colaboratorId}", colaborator));
        }

        [HttpGet("paginate")]
        public async Task<IActionResult> GetPaginate([FromQuery] int page = 1, [FromQuery] int take = 10, [FromQuery] ColaboratorFilter? filter = null)
        {
            var colaborators = await _colaboratorService.GetPaginate(page, take, filter);

            return Ok(SuccessBehavior("Colaboradores Paginados", colaborators));
        }

        [Authorize]
        [HttpGet("identify")]
        public async Task<IActionResult> IdentifyColaborator([FromQuery] ColaboratorIdentify identify)
        {
            try
            {
                var colaborator = await _colaboratorService.GetByIdentification(identify);

                if (colaborator == null)
                {
                    AddNotification("Nenhum colaborador foi encontrado com essa identificação");
                }

                return Ok(SuccessBehavior("Colaborador Encontrado", colaborator));
            } 
            catch(Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ColaboratorCreate colaboratorIn)
        {
            try
            {
                var colaborator = _mapper.Map<Colaborator>(colaboratorIn);

                var saved = await _colaboratorService.Add(colaborator);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar o colaborador no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Colaborador criado com sucesso", colaborator));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        private void UpdateColaborator(Colaborator colaborator, ColaboratorUpdate colaboratorIn)
        {
            colaborator.Name = colaboratorIn.Name;
            colaborator.BadgeCardNumber = colaboratorIn.BadgeCardNumber;
            colaborator.RFIDCardNumber = colaboratorIn.RFIDCardNumber;
            colaborator.RENumber = colaboratorIn.RENumber;
            colaborator.IdColaboratorCategory = colaboratorIn.IdColaboratorCategory;
            colaborator.IdTechniqueCategory = colaboratorIn.IdTechniqueCategory;
            colaborator.IdShift = colaboratorIn.IdShift;
            colaborator.IdLine = colaboratorIn.IdLine;
        }

        [Authorize]
        [HttpPatch]
        public async Task<IActionResult> Update([FromBody] ColaboratorUpdate colaboratorIn)
        {
            try
            {
                var colaborator = await _colaboratorService.GetById(colaboratorIn.Id);

                if (colaborator == null)
                {
                    AddNotification("Colaborador não encontrado.");
                    throw new Exception("Colaborador não encontrado.");
                }

                UpdateColaborator(colaborator, colaboratorIn);

                var saved = await _colaboratorService.Update(colaborator);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar o colaborador no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Colaborador alterado com sucesso", colaborator));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{colaboratorId}")]
        public async Task<IActionResult> Remove(int colaboratorId)
        {
            try
            {
                var saved = await _colaboratorService.Remove(colaboratorId);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel remover o colaborador no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Colaborador removido com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }
    }
}
