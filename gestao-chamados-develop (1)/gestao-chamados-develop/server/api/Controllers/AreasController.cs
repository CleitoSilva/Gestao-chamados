using api.Base;
using api.Dto.Areas;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/areas")]
    [ApiController]
    public class AreasController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IAreaService _areaService;

        public AreasController(IMapper mapper, IAreaService areaService, INotificator notificator) : base(notificator)
        {
            _mapper = mapper;
            _areaService = areaService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var areas = await _areaService.GetAll();

            return Ok(SuccessBehavior("Lista completa de áreas", areas));
        }

        [HttpGet("{areaId}")]
        public async Task<IActionResult> GetById(int areaId)
        {
            var area = await _areaService.GetById(areaId);

            return Ok(SuccessBehavior($"Área com Id: {areaId}", area));
        }

        [HttpGet("paginate")]
        public async Task<IActionResult> GetPaginate([FromQuery] int page = 1, [FromQuery] int take = 10, [FromQuery] AreaFilter? filter = null)
        {
            var areas = await _areaService.GetPaginate(page, take, filter);

            return Ok(SuccessBehavior("Áreas paginadas", areas));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AreaCreate areaIn)
        {
            try
            {
                var area = _mapper.Map<Area>(areaIn);

                var saved = await _areaService.Add(area);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel salvar a área no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Área criada com sucesso", area));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        private void UpdateArea(Area area, AreaUpdate areaIn)
        {
            area.Name = areaIn.Name;
            area.Description = areaIn.Description;
        }

        [Authorize]
        [HttpPatch]
        public async Task<IActionResult> Update([FromBody] AreaUpdate areaIn)
        {
            try
            {
                var area = await _areaService.GetById(areaIn.Id);

                if (area == null)
                {
                    AddNotification("Area não encontrada.");
                    throw new Exception("Area não encontrada.");
                }

                UpdateArea(area, areaIn);

                var saved = await _areaService.Update(area);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar a área no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Área alterada com sucesso", area));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{areaId}")]
        public async Task<IActionResult> Remove(int areaId)
        {
            try
            {
                var saved = await _areaService.Remove(areaId);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel remover a área no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Área removida com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }
    }
}
