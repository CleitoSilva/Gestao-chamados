using api.Base;
using api.Interfaces.Repositories;
using api.Interfaces;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using api.Validations;
using server.Dto;
using api.Dto.Colaborators;

namespace api.Services
{
    public class ColaboratorService : BaseService, IColaboratorService
    {
        private readonly IColaboratorRepository _colaboratorRepository;

        public ColaboratorService(IColaboratorRepository colaboratorRepository, IUnitOfWork uow, INotificator notificator) : base(uow, notificator)
        {
            _colaboratorRepository = colaboratorRepository;
        }

        public async Task<IEnumerable<Colaborator>> GetAll()
        {
            return await _colaboratorRepository.GetAll();
        }

        public async Task<IEnumerable<Colaborator>> GetAllNotInTicket(int idTicket)
        {
            return await _colaboratorRepository.GetAllNotInTicket(idTicket);
        }

        public async Task<Colaborator?> GetById(int id)
        {
            return await _colaboratorRepository.GetById(id);
        }

        public async Task<Colaborator?> GetByIdentification(ColaboratorIdentify identify)
        {
            return await _colaboratorRepository.GetByIdentification(identify);
        }

        public async Task<Paginate<Colaborator>> GetPaginate(int page, int take, ColaboratorFilter? filter)
        {
            return await _colaboratorRepository.GetPaginate(page, take, filter);
        }

        public async Task<bool> Add(Colaborator colaborator)
        {
            if (colaborator == null)
            {
                AddNotification("Colaborador fornecido é nulo");
                return false;
            }

            if (!ValidateObject<Colaborator>(new ColaboratorValidation(), colaborator))
            {
                return false;
            }

            if (_colaboratorRepository.Search(x => x.Name == colaborator.Name && x.IdEnterprise == colaborator.IdEnterprise).Result.Any())
            {
                AddNotification("Já existe um colaborador cadastrado com esse nome");
                return false;
            }

            await _colaboratorRepository.Add(colaborator);

            return await PersistChanges();
        }

        public async Task<bool> Update(Colaborator colaborator)
        {
            if (colaborator == null)
            {
                AddNotification("Colaborador fornecido é nulo");
                return false;
            }

            if (!ValidateObject<Colaborator>(new ColaboratorValidation(), colaborator))
            {
                return false;
            }

            if (_colaboratorRepository.Search(x => x.Name == colaborator.Name && x.IdEnterprise == colaborator.IdEnterprise && x.Id != colaborator.Id).Result.Any())
            {
                AddNotification("Já existe um colaborador cadastrado com esse nome");
                return false;
            }

            _colaboratorRepository.Update(colaborator);

            return await PersistChanges();
        }

        public async Task<bool> Remove(int colaboratorId)
        {
            var colaborator = await _colaboratorRepository.GetByIdForRemove(colaboratorId);

            if (colaborator == null)
            {
                AddNotification("Não existe colaborador com esse Id.");
                return false;
            }

            _colaboratorRepository.Remove(colaborator);

            return await PersistChanges();
        }
    }
}
