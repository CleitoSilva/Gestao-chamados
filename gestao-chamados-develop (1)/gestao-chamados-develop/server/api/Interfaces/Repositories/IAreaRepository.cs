using api.Dto.Areas;
using api.Models;
using server.Dto;
using System.Linq.Expressions;

namespace api.Interfaces.Repositories
{
    public interface IAreaRepository
    {
        Task Add(Area area);
        void Update(Area area);
        void Remove(Area area);
        Task<Area?> GetById(int id);
        Task<Area?> GetByIdForRemove(int id);
        Task<IEnumerable<Area>> GetAll();
        Task<Paginate<Area>> GetPaginate(int page, int take, AreaFilter? filter);
        Task<IEnumerable<Area>> Search(Expression<Func<Area, bool>> predicate);
    }
}
