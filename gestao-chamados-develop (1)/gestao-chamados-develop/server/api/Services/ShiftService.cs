using api.Base;
using api.Interfaces.Repositories;
using api.Interfaces;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using api.Validations;
using server.Dto;
using api.Dto.Shifts;

namespace api.Services
{
    public class ShiftService : BaseService, IShiftService
    {
        private readonly IShiftRepository _shiftRepository;

        public ShiftService(IShiftRepository shiftRepository, IUnitOfWork uow, INotificator notificator) : base(uow, notificator)
        {
            _shiftRepository = shiftRepository;
        }

        public async Task<IEnumerable<Shift>> GetAll()
        {
            return await _shiftRepository.GetAll();
        }

        public async Task<Shift?> GetById(int id)
        {
            return await _shiftRepository.GetById(id);
        }

        public async Task<Paginate<Shift>> GetPaginate(int page, int take, ShiftFilter? filter)
        {
            return await _shiftRepository.GetPaginate(page, take, filter);
        }

        public async Task<bool> Add(Shift shift)
        {
            if (shift == null)
            {
                AddNotification("Turno fornecido é nulo");
                return false;
            }

            if (!ValidateObject<Shift>(new ShiftValidation(), shift))
            {
                return false;
            }

            if (_shiftRepository.Search(x => x.Description == shift.Description && x.IdEnterprise == shift.IdEnterprise).Result.Any())
            {
                AddNotification("Já existe um turno cadastrado com esse nome");
                return false;
            }

            await _shiftRepository.Add(shift);

            return await PersistChanges();
        }

        public async Task<bool> Update(Shift shift)
        {
            if (shift == null)
            {
                AddNotification("Turno fornecido é nulo");
                return false;
            }

            if (!ValidateObject<Shift>(new ShiftValidation(), shift))
            {
                return false;
            }

            if (_shiftRepository.Search(x => x.Description == shift.Description && x.IdEnterprise == shift.IdEnterprise && x.Id != shift.Id).Result.Any())
            {
                AddNotification("Já existe um turno cadastrado com esse nome");
                return false;
            }

            _shiftRepository.Update(shift);

            return await PersistChanges();
        }

        public async Task<bool> Remove(int shiftId)
        {
            var shift = await _shiftRepository.GetByIdForRemove(shiftId);

            if (shift == null)
            {
                AddNotification("Não existe turno com esse Id.");
                return false;
            }

            _shiftRepository.Remove(shift);

            return await PersistChanges();
        }
    }
}
