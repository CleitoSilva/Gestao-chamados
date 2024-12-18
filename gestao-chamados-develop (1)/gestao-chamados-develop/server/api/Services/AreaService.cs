using api.Base;
using api.Interfaces.Repositories;
using api.Interfaces;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using api.Validations;
using server.Dto;
using api.Dto.Areas;

namespace api.Services
{
    public class AreaService : BaseService, IAreaService
    {
        private readonly IAreaRepository _areaRepository;

        public AreaService(IAreaRepository areaRepository, IUnitOfWork uow, INotificator notificator) : base(uow, notificator)
        {
            _areaRepository = areaRepository;
        }

        public async Task<IEnumerable<Area>> GetAll()
        {
            return await _areaRepository.GetAll();
        }

        public async Task<Area?> GetById(int id)
        {
            return await _areaRepository.GetById(id);
        }

        public async Task<Paginate<Area>> GetPaginate(int page, int take, AreaFilter? filter)
        {
            return await _areaRepository.GetPaginate(page, take, filter);
        }

        public async Task<bool> Add(Area area)
        {
            if (area == null)
            {
                AddNotification("Area fornecida é nula");
                return false;
            }

            if (!ValidateObject<Area>(new AreaValidation(), area))
            {
                return false;
            }

            if (_areaRepository.Search(x => x.Name == area.Name && x.IdEnterprise == area.IdEnterprise).Result.Any())
            {
                AddNotification("Já existe uma área cadastrada cadastrada com esse nome");
                return false;
            }

            await _areaRepository.Add(area);

            return await PersistChanges();
        }

        public async Task<bool> Update(Area area)
        {
            if (area == null)
            {
                AddNotification("Area fornecida é nula");
                return false;
            }

            if (!ValidateObject<Area>(new AreaValidation(), area))
            {
                return false;
            }

            if (_areaRepository.Search(x => x.Name == area.Name && x.IdEnterprise == area.IdEnterprise && x.Id != area.Id).Result.Any())
            {
                AddNotification("Já existe uma área cadastrada cadastrada com esse nome");
                return false;
            }

            _areaRepository.Update(area);

            return await PersistChanges();
        }

        public async Task<bool> Remove(int areaId)
        {
            var area = await _areaRepository.GetByIdForRemove(areaId);

            if (area == null)
            {
                AddNotification("Não existe area com esse Id.");
                return false;
            }

            _areaRepository.Remove(area);

            return await PersistChanges();
        }
    }
}
