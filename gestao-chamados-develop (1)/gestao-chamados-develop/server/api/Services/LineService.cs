using api.Base;
using api.Interfaces.Repositories;
using api.Interfaces;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using api.Validations;
using server.Dto;
using api.Dto.Lines;

namespace api.Services
{
    public class LineService : BaseService, ILineService
    {
        private readonly ILineRepository _lineRepository;

        public LineService(ILineRepository lineRepository, IUnitOfWork uow, INotificator notificator) : base(uow, notificator)
        {
            _lineRepository = lineRepository;
        }

        public async Task<IEnumerable<Line>> GetAll()
        {
            return await _lineRepository.GetAll();
        }

        public async Task<Line?> GetById(int id)
        {
            return await _lineRepository.GetById(id);
        }

        public async Task<Paginate<Line>> GetPaginate(int page, int take, LineFilter? filter)
        {
            return await _lineRepository.GetPaginate(page, take, filter);
        }

        public async Task<bool> Add(Line line)
        {
            if (line == null)
            {
                AddNotification("Linha fornecida é nula");
                return false;
            }

            if (!ValidateObject<Line>(new LineValidation(), line))
            {
                return false;
            }

            if (_lineRepository.Search(x => x.Name == line.Name && x.IdEnterprise == line.IdEnterprise).Result.Any())
            {
                AddNotification("Já existe uma linha cadastrada cadastrada com esse nome");
                return false;
            }

            await _lineRepository.Add(line);

            return await PersistChanges();
        }

        public async Task<bool> Update(Line line)
        {
            if (line == null)
            {
                AddNotification("Linha fornecida é nula");
                return false;
            }

            if (!ValidateObject<Line>(new LineValidation(), line))
            {
                return false;
            }

            if (_lineRepository.Search(x => x.Name == line.Name && x.IdEnterprise == line.IdEnterprise && x.Id != line.Id).Result.Any())
            {
                AddNotification("Já existe uma linha cadastrada cadastrada com esse nome");
                return false;
            }

            _lineRepository.Update(line);

            return await PersistChanges();
        }

        public async Task<bool> Remove(int lineId)
        {
            var line = await _lineRepository.GetByIdForRemove(lineId);

            if (line == null)
            {
                AddNotification("Não existe linha com esse Id.");
                return false;
            }

            _lineRepository.Remove(line);

            return await PersistChanges();
        }
    }
}
