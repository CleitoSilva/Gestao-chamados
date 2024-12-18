using api.Base;
using api.Dto.Machines;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/machines")]
    [ApiController]
    public class MachinesController : BaseController
    {
        private readonly IMapper _mapper;
        private readonly IMachineService _machineService;

        public MachinesController(IMapper mapper, IMachineService machineService, INotificator notificator) : base(notificator)
        {
            _mapper = mapper;
            _machineService = machineService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var machines = await _machineService.GetAll();

            return Ok(SuccessBehavior("Lista de máquinas completa", machines));
        }

        [HttpGet("{machineId}")]
        public async Task<IActionResult> GetById(int machineId)
        {
            var machine = await _machineService.GetById(machineId);

            return Ok(SuccessBehavior($"Máquina com Id: {machineId}", machine));
        }

        [HttpGet("paginate")]
        public async Task<IActionResult> GetPaginate([FromQuery] int page = 1, [FromQuery] int take = 10, [FromQuery] MachineFilter? filter = null)
        {
            var machines = await _machineService.GetPaginate(page, take, filter);

            return Ok(SuccessBehavior("Máquinas Paginadas", machines));
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] MachineCreate machineIn)
        {
            try
            {
                var machine = _mapper.Map<Machine>(machineIn);

                var saved = await _machineService.Add(machine);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel salvar a máquina no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Máquina criada com sucesso", machine));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        private void UpdateMachine(Machine machine, MachineUpdate machineIn)
        {
            machine.Name = machineIn.Name;
            machine.Description = machineIn.Description;
            machine.Order = machineIn.Order;
            machine.IdLine = machineIn.IdLine;
        }

        [Authorize]
        [HttpPatch]
        public async Task<IActionResult> Update([FromBody] MachineUpdate machineIn)
        {
            try
            {
                var machine = await _machineService.GetById(machineIn.Id);

                if (machine == null)
                {
                    AddNotification("Máquina não encontrada.");
                    throw new Exception("Máquina não encontrada.");
                }

                UpdateMachine(machine, machineIn);

                var saved = await _machineService.Update(machine);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel alterar a máquina no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Máquina alterada com sucesso", machine));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }

        [Authorize]
        [HttpDelete("{machineId}")]
        public async Task<IActionResult> Remove(int machineId)
        {
            try
            {
                var saved = await _machineService.Remove(machineId);

                if (!saved)
                {
                    AddNotification("Ocorreu um erro. Não foi possivel remover a máquina no banco de dados.");
                    throw new Exception();
                }

                return Ok(SuccessBehavior("Máquina removida com sucesso"));
            }
            catch (Exception ex)
            {
                return BadRequestBehavior(ex.Message);
            }
        }
    }
}
