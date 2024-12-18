using api.Base;
using api.Dto.ColaboratorCategories;
using api.Dto.Shifts;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/shifts")]
    [ApiController]
    public class ShiftsController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IShiftService _shiftService;

        public ShiftsController(IMapper mapper, IShiftService shiftService, INotificator notificator) : base(notificator)
        {
            _mapper = mapper;
            _shiftService = shiftService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var shifts = await _shiftService.GetAll();

            return Ok(SuccessBehavior("Lista completas de turnos", shifts));
        }

        [HttpGet("{shiftId}")]
        public async Task<IActionResult> GetById(int shiftId)
        {
            var shift = await _shiftService.GetById(shiftId);

            return Ok(SuccessBehavior($"Turno com Id: {shiftId}", shift));
        }

        [HttpGet("paginate")]
        public async Task<IActionResult> GetPaginate([FromQuery] int page = 1, [FromQuery] int take = 10, [FromQuery] ShiftFilter? filter = null)
        {
            var shifts = await _shiftService.GetPaginate(page, take, filter);

            return Ok(SuccessBehavior("Turnos Paginados", shifts));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ShiftCreate shiftIn)
        {
            try
            {
                var shift = _mapper.Map<Shift>(shiftIn);

                var saved = await _shiftService.Add(shift);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel cadastrar o turno no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Turno cadastrado com sucesso", shift));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        private void UpdateShift(Shift shift, ShiftUpdate shiftIn)
        {
            shift.Description = shiftIn.Description;
            shift.StartHour = shiftIn.StartHour;
            shift.EndHour = shiftIn.EndHour;
        }

        [Authorize]
        [HttpPatch]
        public async Task<IActionResult> Update([FromBody] ShiftUpdate shiftIn)
        {
            try
            {
                var shift = await _shiftService.GetById(shiftIn.Id);

                if (shift == null)
                {
                    AddNotification("Turno não encontrado.");
                    throw new Exception("Turno não encontrado.");
                }

                UpdateShift(shift, shiftIn);

                var saved = await _shiftService.Update(shift);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar o turno no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Turno alterado com sucesso", shift));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{shiftId}")]
        public async Task<IActionResult> Remove(int shiftId)
        {
            try
            {
                var saved = await _shiftService.Remove(shiftId);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel remover o turno no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Turno removido com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }
    }
}
