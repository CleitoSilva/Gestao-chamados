using api.Base;
using api.Interfaces.Repositories;
using api.Interfaces;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using api.Validations;
using server.Dto;
using api.Dto.Machines;

namespace api.Services
{
    public class MachineService : BaseService, IMachineService
    {
        private readonly IMachineRepository _machineRepository;

        public MachineService(IMachineRepository machineRepository, IUnitOfWork uow, INotificator notificator) : base(uow, notificator)
        {
            _machineRepository = machineRepository;
        }

        public async Task<IEnumerable<Machine>> GetAll()
        {
            return await _machineRepository.GetAll();
        }

        public async Task<Machine?> GetById(int id)
        {
            return await _machineRepository.GetById(id);
        }

        public async Task<Paginate<Machine>> GetPaginate(int page, int take, MachineFilter? filter)
        {
            return await _machineRepository.GetPaginate(page, take, filter);
        }

        public async Task<bool> Add(Machine machine)
        {
            if (machine == null)
            {
                AddNotification("Máquina fornecida é nula");
                return false;
            }

            if (!ValidateObject<Machine>(new MachineValidation(), machine))
            {
                return false;
            }

            if (_machineRepository.Search(x => x.Name == machine.Name && x.IdLine == machine.IdLine && x.IdEnterprise == machine.IdEnterprise).Result.Any())
            {
                AddNotification("Já existe uma máquina cadastrada cadastrada com esse nome para essa linha");
                return false;
            }

            await _machineRepository.Add(machine);

            return await PersistChanges();
        }

        public async Task<bool> Update(Machine machine)
        {
            if (machine == null)
            {
                AddNotification("Máquina fornecida é nula");
                return false;
            }

            if (!ValidateObject<Machine>(new MachineValidation(), machine))
            {
                return false;
            }

            if (_machineRepository.Search(x => x.Name == machine.Name && x.IdLine == machine.IdLine && x.IdEnterprise == machine.IdEnterprise && x.Id != machine.Id).Result.Any())
            {
                AddNotification("Já existe uma máquina cadastrada cadastrada com esse nome para essa linha");
                return false;
            }

            _machineRepository.Update(machine);

            return await PersistChanges();
        }

        public async Task<bool> Remove(int machineId)
        {
            var machine = await _machineRepository.GetByIdForRemove(machineId);

            if (machine == null)
            {
                AddNotification("Não existe máquina com esse Id.");
                return false;
            }

            _machineRepository.Remove(machine);

            return await PersistChanges();
        }
    }
}
