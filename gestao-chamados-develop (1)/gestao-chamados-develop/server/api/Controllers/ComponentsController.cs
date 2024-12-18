using api.Base;
using api.Dto.Components;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/components")]
    [ApiController]
    public class ComponentsController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IComponentService _componentService;

        public ComponentsController(IMapper mapper, IComponentService componentService, INotificator notificator) : base(notificator)
        {
            _mapper = mapper;
            _componentService = componentService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var components = await _componentService.GetAll();

            return Ok(SuccessBehavior("Lista completa dos componentes", components));
        }

        [HttpGet("{componentId}")]
        public async Task<IActionResult> GetById(int componentId)
        {
            var component = await _componentService.GetById(componentId);

            return Ok(SuccessBehavior($"Componente com Id: {componentId}", component));
        }

        [HttpGet("paginate")]
        public async Task<IActionResult> GetPaginate([FromQuery] int page = 1, [FromQuery] int take = 10, [FromQuery] ComponentFilter? filter = null)
        {
            var components = await _componentService.GetPaginate(page, take, filter);

            return Ok(SuccessBehavior("Componentes Paginados", components));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ComponentCreate componentIn)
        {
            try
            {
                var component = _mapper.Map<Component>(componentIn);

                var saved = await _componentService.Add(component);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel salvar o componente no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Componente cadastrado com sucesso", component));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        private void UpdateComponent(Component component, ComponentUpdate componentIn)
        {
            component.Name = componentIn.Name;
            component.Description = componentIn.Description;
            component.IdMachine = componentIn.IdMachine;
        }

        [Authorize]
        [HttpPatch]
        public async Task<IActionResult> Update([FromBody] ComponentUpdate componentIn)
        {
            try
            {
                var component = await _componentService.GetById(componentIn.Id);

                if (component == null)
                {
                    AddNotification("Componente não encontrada.");
                    throw new Exception("Component não encontrada.");
                }

                UpdateComponent(component, componentIn);

                var saved = await _componentService.Update(component);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar o componente no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Componente alterado com sucesso", component));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{componentId}")]
        public async Task<IActionResult> Remove(int componentId)
        {
            try
            {
                var saved = await _componentService.Remove(componentId);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel remover o componente no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Componente removido com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }
    }
}
