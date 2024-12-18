using api.Base;
using api.Dto.Enterprises;
using api.Interfaces;
using api.Interfaces.Repositories;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using api.Validations;
using server.Dto;

namespace api.Services
{
    public class EnterpriseService : BaseService, IEnterpriseService
    {
        private readonly IEnterpriseRepository _enterpriseRepository;

        public EnterpriseService(IEnterpriseRepository enterpriseRepository, IUnitOfWork uow, INotificator notificator) : base(uow, notificator)
        {
            _enterpriseRepository = enterpriseRepository;
        }

        public async Task<IEnumerable<Enterprise>> GetAll()
        {
            return await _enterpriseRepository.GetAll();
        }

        public async Task<Enterprise?> GetById(Guid id)
        {
            return await _enterpriseRepository.GetById(id);
        }

        public async Task<Paginate<Enterprise>> GetPaginate(int page, int take, EnterpriseFilter? filter)
        {
            return await _enterpriseRepository.GetPaginate(page, take, filter);
        }

        public async Task<bool> Add(Enterprise enterprise)
        {
            if (enterprise == null)
            {
                AddNotification("Empresa fornecida é nula");
                return false;
            }

            if (!ValidateObject<Enterprise>(new EnterpriseValidation(), enterprise))
            {
                return false;
            }

            if (_enterpriseRepository.Search(x => x.Name == enterprise.Name).Result.Any())
            {
                AddNotification("Já existe uma empresa cadastrada cadastrada com esse nome");
                return false;
            }

            await _enterpriseRepository.Add(enterprise);

            return await PersistChanges();
        }

        public async Task<bool> Update(Enterprise enterprise)
        {
            if (enterprise == null)
            {
                AddNotification("Empresa fornecida é nula");
                return false;
            }

            if (!ValidateObject<Enterprise>(new EnterpriseValidation(), enterprise))
            {
                return false;
            }

            if (_enterpriseRepository.Search(x => x.Name == enterprise.Name  && x.Id != enterprise.Id).Result.Any())
            {
                AddNotification("Já existe uma empresa cadastrada cadastrada com esse nome");
                return false;
            }

            _enterpriseRepository.Update(enterprise);

            return await PersistChanges();
        }

        public async Task<bool> Remove(Guid enterpriseId)
        {
            var enterprise = await _enterpriseRepository.GetByIdForRemove(enterpriseId);

            if (enterprise == null)
            {
                AddNotification("Não existe empresa com esse Id.");
                return false;
            }

            _enterpriseRepository.Remove(enterprise);

            return await PersistChanges();
        }
    }
}
