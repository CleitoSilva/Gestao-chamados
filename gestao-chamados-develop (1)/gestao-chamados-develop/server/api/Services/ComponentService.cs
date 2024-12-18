using api.Base;
using api.Interfaces.Repositories;
using api.Interfaces;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using api.Validations;
using server.Dto;
using api.Dto.Components;

namespace api.Services
{
    public class ComponentService : BaseService, IComponentService
    {
        private readonly IComponentRepository _componentRepository;

        public ComponentService(IComponentRepository componentRepository, IUnitOfWork uow, INotificator notificator) : base(uow, notificator)
        {
            _componentRepository = componentRepository;
        }

        public async Task<IEnumerable<Component>> GetAll()
        {
            return await _componentRepository.GetAll();
        }

        public async Task<Component?> GetById(int id)
        {
            return await _componentRepository.GetById(id);
        }

        public async Task<Paginate<Component>> GetPaginate(int page, int take, ComponentFilter? filter)
        {
            return await _componentRepository.GetPaginate(page, take, filter);
        }

        public async Task<bool> Add(Component component)
        {
            if (component == null)
            {
                AddNotification("Componente fornecido é nulo");
                return false;
            }

            if (!ValidateObject<Component>(new ComponentValidation(), component))
            {
                return false;
            }

            if (_componentRepository.Search(x => x.Name == component.Name && x.IdMachine == component.IdMachine && x.IdEnterprise == component.IdEnterprise).Result.Any())
            {
                AddNotification("Já existe um componente cadastrado com esse nome");
                return false;
            }

            await _componentRepository.Add(component);

            return await PersistChanges();
        }

        public async Task<bool> Update(Component component)
        {
            if (component == null)
            {
                AddNotification("Componente fornecido é nulo");
                return false;
            }

            if (!ValidateObject<Component>(new ComponentValidation(), component))
            {
                return false;
            }

            if (_componentRepository.Search(x => x.Name == component.Name && x.IdMachine == component.IdMachine && x.IdEnterprise == component.IdEnterprise && x.Id != component.Id).Result.Any())
            {
                AddNotification("Já existe um componente cadastrado cadastrado com esse nome");
                return false;
            }

            _componentRepository.Update(component);

            return await PersistChanges();
        }

        public async Task<bool> Remove(int componentId)
        {
            var component = await _componentRepository.GetByIdForRemove(componentId);

            if (component == null)
            {
                AddNotification("Não existe componentr com esse Id.");
                return false;
            }

            _componentRepository.Remove(component);

            return await PersistChanges();
        }
    }
}
