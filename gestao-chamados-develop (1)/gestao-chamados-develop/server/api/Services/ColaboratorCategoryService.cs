using api.Base;
using api.Interfaces.Repositories;
using api.Interfaces;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using api.Validations;
using server.Dto;
using api.Dto.ColaboratorCategories;

namespace api.Services
{
    public class ColaboratorCategoryService : BaseService, IColaboratorCategoryService
    {
        private readonly IColaboratorCategoryRepository _colaboratorCategoryRepository;

        public ColaboratorCategoryService(IColaboratorCategoryRepository colaboratorCategoryRepository, IUnitOfWork uow, INotificator notificator) : base(uow, notificator)
        {
            _colaboratorCategoryRepository = colaboratorCategoryRepository;
        }

        public async Task<IEnumerable<ColaboratorCategory>> GetAll()
        {
            return await _colaboratorCategoryRepository.GetAll();
        }

        public async Task<ColaboratorCategory?> GetById(int id)
        {
            return await _colaboratorCategoryRepository.GetById(id);
        }

        public async Task<Paginate<ColaboratorCategory>> GetPaginate(int page, int take, ColaboratorCategoryFilter? filter)
        {
            return await _colaboratorCategoryRepository.GetPaginate(page, take, filter);
        }

        public async Task<bool> Add(ColaboratorCategory colaboratorCategory)
        {
            if (colaboratorCategory == null)
            {
                AddNotification("Categoria do colaborador fornecida é nula");
                return false;
            }

            if (!ValidateObject<ColaboratorCategory>(new ColaboratorCategoryValidation(), colaboratorCategory))
            {
                return false;
            }

            if (_colaboratorCategoryRepository.Search(x => x.Name == colaboratorCategory.Name && x.IdEnterprise == colaboratorCategory.IdEnterprise).Result.Any())
            {
                AddNotification("Já existe uma Categoria do colaborador cadastrada cadastrada com esse nome");
                return false;
            }

            await _colaboratorCategoryRepository.Add(colaboratorCategory);

            return await PersistChanges();
        }

        public async Task<bool> Update(ColaboratorCategory colaboratorCategory)
        {
            if (colaboratorCategory == null)
            {
                AddNotification("Categoria do colaborador fornecida é nula");
                return false;
            }

            if (!ValidateObject<ColaboratorCategory>(new ColaboratorCategoryValidation(), colaboratorCategory))
            {
                return false;
            }

            if (_colaboratorCategoryRepository.Search(x => x.Name == colaboratorCategory.Name && x.IdEnterprise == colaboratorCategory.IdEnterprise && x.Id != colaboratorCategory.Id).Result.Any())
            {
                AddNotification("Já existe uma Categoria do colaborador cadastrada cadastrada com esse nome");
                return false;
            }

            _colaboratorCategoryRepository.Update(colaboratorCategory);

            return await PersistChanges();
        }

        public async Task<bool> Remove(int colaboratorCategoryId)
        {
            var colaboratorCategory = await _colaboratorCategoryRepository.GetByIdForRemove(colaboratorCategoryId);

            if (colaboratorCategory == null)
            {
                AddNotification("Não existe Categoria do colaborador com esse Id.");
                return false;
            }

            _colaboratorCategoryRepository.Remove(colaboratorCategory);

            return await PersistChanges();
        }
    }
}
