using api.Base;
using api.Interfaces.Repositories;
using api.Interfaces;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using api.Validations;
using server.Dto;
using api.Dto.SubAreas;

namespace api.Services
{
    public class SubAreaService : BaseService, ISubAreaService
    {
        private readonly ISubAreaRepository _subAreaRepository;

        public SubAreaService(ISubAreaRepository subAreaRepository, IUnitOfWork uow, INotificator notificator) : base(uow, notificator)
        {
            _subAreaRepository = subAreaRepository;
        }

        public async Task<IEnumerable<SubArea>> GetAll()
        {
            return await _subAreaRepository.GetAll();
        }

        public async Task<SubArea?> GetById(int id)
        {
            return await _subAreaRepository.GetById(id);
        }

        public async Task<Paginate<SubArea>> GetPaginate(int page, int take, SubAreaFilter? filter)
        {
            return await _subAreaRepository.GetPaginate(page, take, filter);
        }

        public async Task<bool> Add(SubArea subArea)
        {
            if (subArea == null)
            {
                AddNotification("Sub Area fornecida é nula");
                return false;
            }

            if (!ValidateObject<SubArea>(new SubAreaValidation(), subArea))
            {
                return false;
            }

            if (_subAreaRepository.Search(x => x.Name == subArea.Name && x.IdEnterprise == subArea.IdEnterprise && x.IdArea == subArea.IdArea).Result.Any())
            {
                AddNotification("Já existe uma sub area cadastrada cadastrada com esse nome para essa area");
                return false;
            }

            await _subAreaRepository.Add(subArea);

            return await PersistChanges();
        }

        public async Task<bool> Update(SubArea subArea)
        {
            if (subArea == null)
            {
                AddNotification("Sub Area fornecida é nula");
                return false;
            }

            if (!ValidateObject<SubArea>(new SubAreaValidation(), subArea))
            {
                return false;
            }

            if (_subAreaRepository.Search(x => x.Name == subArea.Name && x.IdEnterprise == subArea.IdEnterprise && x.IdArea == subArea.IdArea && x.Id != subArea.Id).Result.Any())
            {
                AddNotification("Já existe uma sub area cadastrada cadastrada com esse nome para essa area");
                return false;
            }

            _subAreaRepository.Update(subArea);

            return await PersistChanges();
        }

        public async Task<bool> Remove(int subAreaId)
        {
            var subArea = await _subAreaRepository.GetByIdForRemove(subAreaId);

            if (subArea == null)
            {
                AddNotification("Não existe sub area com esse Id.");
                return false;
            }

            _subAreaRepository.Remove(subArea);

            return await PersistChanges();
        }
    }
}
