using api.Dto.Lines;
using api.Models;
using server.Dto;

namespace api.Interfaces.Services
{
    public interface ILineService
    {
        Task<Boolean> Add(Line line);
        Task<Boolean> Update(Line line);
        Task<Boolean> Remove(int lineId);
        Task<Line?> GetById(int id);
        Task<Paginate<Line>> GetPaginate(int page, int take, LineFilter? filter);
        Task<IEnumerable<Line>> GetAll();
    }
}
