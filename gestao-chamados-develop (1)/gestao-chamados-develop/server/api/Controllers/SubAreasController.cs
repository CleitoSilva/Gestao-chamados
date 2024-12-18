using api.Base;
using api.Dto.SubAreas;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/sub-areas")]
    [ApiController]
    public class SubAreasController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly ISubAreaService _subAreaService;

        public SubAreasController(IMapper mapper, ISubAreaService subAreaService, INotificator notificator) : base(notificator)
        {
            _mapper = mapper;
            _subAreaService = subAreaService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var subAreas = await _subAreaService.GetAll();

            return Ok(SuccessBehavior("Lista completa de Subareas", subAreas));
        }

        [HttpGet("{subAreaId}")]
        public async Task<IActionResult> GetById(int subAreaId)
        {
            var subArea = await _subAreaService.GetById(subAreaId);

            return Ok(SuccessBehavior($"Subarea com Id: {subAreaId}", subArea));
        }

        [HttpGet("paginate")]
        public async Task<IActionResult> GetPaginate([FromQuery] int page = 1, [FromQuery] int take = 10, [FromQuery] SubAreaFilter? filter = null)
        {
            var subAreas = await _subAreaService.GetPaginate(page, take, filter);

            return Ok(SuccessBehavior("Subareas Paginadas", subAreas));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SubAreaCreate subAreaIn)
        {
            try
            {
                var subArea = _mapper.Map<SubArea>(subAreaIn);

                var saved = await _subAreaService.Add(subArea);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel salvar a sub area no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Subarea cadastrada com sucesso", subArea));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        private void UpdateSubArea(SubArea subArea, SubAreaUpdate subAreaIn)
        {
            subArea.Name = subAreaIn.Name;
            subArea.Description = subAreaIn.Description;
            subArea.IdArea = subAreaIn.IdArea;
        }

        [Authorize]
        [HttpPatch]
        public async Task<IActionResult> Update([FromBody] SubAreaUpdate subAreaIn)
        {
            try
            {
                var subArea = await _subAreaService.GetById(subAreaIn.Id);

                if (subArea == null)
                {
                    AddNotification("Sub area não encontrada.");
                    throw new Exception("Sub area não encontrada.");
                }

                UpdateSubArea(subArea, subAreaIn);

                var saved = await _subAreaService.Update(subArea);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar a sub area no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Subarea alterada com sucesso", subArea));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{subAreaId}")]
        public async Task<IActionResult> Remove(int subAreaId)
        {
            try
            {
                var saved = await _subAreaService.Remove(subAreaId);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel remover a sub area no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Subarea removida com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }
    }
}
