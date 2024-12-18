using api.Base;
using api.Dto.Lines;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/lines")]
    [ApiController]
    public class LinesController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly ILineService _lineService;

        public LinesController(IMapper mapper, ILineService lineService, INotificator notificator) : base(notificator)
        {
            _mapper = mapper;
            _lineService = lineService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var lines = await _lineService.GetAll();

            return Ok(SuccessBehavior("Lista de linhas completa", lines));
        }

        [HttpGet("{lineId}")]
        public async Task<IActionResult> GetById(int lineId)
        {
            var line = await _lineService.GetById(lineId);

            return Ok(SuccessBehavior($"Linha com Id: {lineId}"));
        }

        [HttpGet("paginate")]
        public async Task<IActionResult> GetPaginate([FromQuery] int page = 1, [FromQuery] int take = 10, [FromQuery] LineFilter? filter = null)
        {
            var lines = await _lineService.GetPaginate(page, take, filter);

            return Ok(SuccessBehavior("Linhas Paginadas", lines));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] LineCreate lineIn)
        {
            try
            {
                var line = _mapper.Map<Line>(lineIn);

                var saved = await _lineService.Add(line);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel salvar a line no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Linha criada com sucesso", line));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        private void UpdateLine(Line line, LineUpdate lineIn)
        {
            line.Name = lineIn.Name;
            line.Description = lineIn.Description;
            line.Number = lineIn.Number;
            line.IdArea = lineIn.IdArea;
            line.IdSubArea = lineIn.IdSubArea;
        }

        [Authorize]
        [HttpPatch]
        public async Task<IActionResult> Update([FromBody] LineUpdate lineIn)
        {
            try
            {
                var line = await _lineService.GetById(lineIn.Id);

                if (line == null)
                {
                    AddNotification("Line não encontrada.");
                    throw new Exception("Line não encontrada.");
                }

                UpdateLine(line, lineIn);

                var saved = await _lineService.Update(line);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar a line no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Linha alterada com sucesso", line));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{lineId}")]
        public async Task<IActionResult> Remove(int lineId)
        {
            try
            {
                var saved = await _lineService.Remove(lineId);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel remover a line no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Linha removida com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }
    }
}
