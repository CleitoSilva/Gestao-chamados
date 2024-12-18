using api.Dto.Enterprises;
using api.Models;
using server.Dto;
using System.Linq.Expressions;

namespace api.Interfaces.Repositories
{
    public interface IEnterpriseRepository
    {
        Task Add(Enterprise enterprise);
        void Update(Enterprise enterprise);
        void Remove(Enterprise enterprise);
        Task<Enterprise?> GetById(Guid id);
        Task<Enterprise?> GetByIdForRemove(Guid id);
        Task<IEnumerable<Enterprise>> GetAll();
        Task<Paginate<Enterprise>> GetPaginate(int page, int take, EnterpriseFilter? filter);
        Task<IEnumerable<Enterprise>> Search(Expression<Func<Enterprise, bool>> predicate);
    }
}
