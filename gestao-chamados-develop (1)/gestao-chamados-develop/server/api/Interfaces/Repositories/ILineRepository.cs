using api.Dto.Lines;
using api.Models;
using server.Dto;
using System.Linq.Expressions;

namespace api.Interfaces.Repositories
{
    public interface ILineRepository
    {
        Task Add(Line line);
        void Update(Line line);
        void Remove(Line line);
        Task<Line?> GetById(int id);
        Task<Line?> GetByIdForRemove(int id);
        Task<IEnumerable<Line>> GetAll();
        Task<Paginate<Line>> GetPaginate(int page, int take, LineFilter? filter);
        Task<IEnumerable<Line>> Search(Expression<Func<Line, bool>> predicate);
    }
}
