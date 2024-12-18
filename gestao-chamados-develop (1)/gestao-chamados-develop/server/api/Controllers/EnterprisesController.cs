using api.Base;
using api.Dto.Enterprises;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/enterprises")]
    [ApiController]
    public class EnterprisesController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IEnterpriseService _enterpriseService;

        public EnterprisesController(IMapper mapper, IEnterpriseService enterpriseService, INotificator notificator) : base(notificator)
        {
            _mapper = mapper;
            _enterpriseService = enterpriseService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var enterprises = await _enterpriseService.GetAll();

            return Ok(SuccessBehavior("Lista completa das empresas", enterprises));
        }

        [HttpGet("{enterpriseId}")]
        public async Task<IActionResult> GetById(Guid enterpriseId)
        {
            var enterprise = await _enterpriseService.GetById(enterpriseId);

            return Ok(SuccessBehavior($"Empresa com Id: {enterpriseId}", enterprise));
        }

        [HttpGet("paginate")]
        public async Task<IActionResult> GetPaginate([FromQuery] int page = 1, [FromQuery] int take = 10, [FromQuery] EnterpriseFilter? filter = null)
        {
            var enterprises = await _enterpriseService.GetPaginate(page, take, filter);

            return Ok(SuccessBehavior("Empresas Paginadas", enterprises));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EnterpriseCreate enterpriseIn)
        {
            try
            {
                var enterprise = _mapper.Map<Enterprise>(enterpriseIn);

                var saved = await _enterpriseService.Add(enterprise);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel salvar a empresa no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Empresa criada com sucesso", enterprise));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        private void UpdateEnterprise(Enterprise enterprise, EnterpriseUpdate enterpriseIn)
        {
            enterprise.Name = enterpriseIn.Name;
            enterprise.Description = enterpriseIn.Description;
        }

        [Authorize]
        [HttpPatch]
        public async Task<IActionResult> Update([FromBody] EnterpriseUpdate enterpriseIn)
        {
            try
            {
                var enterprise = await _enterpriseService.GetById(enterpriseIn.Id);

                if (enterprise == null)
                {
                    AddNotification("Empresa não encontrada.");
                    throw new Exception("Empresa não encontrada.");
                }

                UpdateEnterprise(enterprise, enterpriseIn);

                var saved = await _enterpriseService.Update(enterprise);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar a empresa no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Empresa alterada com sucesso", enterprise));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{enterpriseId}")]
        public async Task<IActionResult> Remove(Guid enterpriseId)
        {
            try
            {
                var saved = await _enterpriseService.Remove(enterpriseId);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel remover a empresa no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Empresa removida com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }
    }
}
