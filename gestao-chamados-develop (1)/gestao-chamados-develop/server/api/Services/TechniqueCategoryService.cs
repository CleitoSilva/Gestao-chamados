using api.Interfaces.Repositories;
using api.Interfaces;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using api.Validations;
using server.Dto;
using api.Base;
using api.Dto.TechniqueCategories;

namespace api.Services
{
    public class TechniqueCategoryService : BaseService, ITechniqueCategoryService
    {
        private readonly ITechniqueCategoryRepository _techniqueCategoryRepository;

        public TechniqueCategoryService(ITechniqueCategoryRepository techniqueCategoryRepository, IUnitOfWork uow, INotificator notificator) : base(uow, notificator)
        {
            _techniqueCategoryRepository = techniqueCategoryRepository;
        }

        public async Task<IEnumerable<TechniqueCategory>> GetAll()
        {
            return await _techniqueCategoryRepository.GetAll();
        }

        public async Task<IEnumerable<TechniqueCategory>> GetAllNotInTicket(int idTicket)
        {
            return await _techniqueCategoryRepository.GetAllNotInTicket(idTicket);
        }

        public async Task<TechniqueCategory?> GetById(int id)
        {
            return await _techniqueCategoryRepository.GetById(id);
        }

        public async Task<Paginate<TechniqueCategory>> GetPaginate(int page, int take, TechniqueCategoryFilter? filter)
        {
            return await _techniqueCategoryRepository.GetPaginate(page, take, filter);
        }

        public async Task<bool> Add(TechniqueCategory techniqueCategory)
        {
            if (techniqueCategory == null)
            {
                AddNotification("Categoria técnica fornecida é nula");
                return false;
            }

            if (!ValidateObject<TechniqueCategory>(new TechniqueCategoryValidation(), techniqueCategory))
            {
                return false;
            }

            if (_techniqueCategoryRepository.Search(x => x.Name == techniqueCategory.Name && x.IdEnterprise == techniqueCategory.IdEnterprise).Result.Any())
            {
                AddNotification("Já existe uma categoria técnica cadastrada cadastrada com esse nome");
                return false;
            }

            await _techniqueCategoryRepository.Add(techniqueCategory);

            return await PersistChanges();
        }

        public async Task<bool> Update(TechniqueCategory techniqueCategory)
        {
            if (techniqueCategory == null)
            {
                AddNotification("Categoria técnica fornecida é nula");
                return false;
            }

            if (!ValidateObject<TechniqueCategory>(new TechniqueCategoryValidation(), techniqueCategory))
            {
                return false;
            }

            if (_techniqueCategoryRepository.Search(x => x.Name == techniqueCategory.Name && x.IdEnterprise == techniqueCategory.IdEnterprise && x.Id != techniqueCategory.Id).Result.Any())
            {
                AddNotification("Já existe uma categoria técnica cadastrada cadastrada com esse nome");
                return false;
            }

            _techniqueCategoryRepository.Update(techniqueCategory);

            return await PersistChanges();
        }

        public async Task<bool> Remove(int techniqueCategoryId)
        {
            var techniqueCategory = await _techniqueCategoryRepository.GetByIdForRemove(techniqueCategoryId);

            if (techniqueCategory == null)
            {
                AddNotification("Não existe categoria técnica com esse Id.");
                return false;
            }

            _techniqueCategoryRepository.Remove(techniqueCategory);

            return await PersistChanges();
        }
    }
}
