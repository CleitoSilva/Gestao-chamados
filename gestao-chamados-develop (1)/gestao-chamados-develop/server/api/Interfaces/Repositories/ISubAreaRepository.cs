using api.Dto.SubAreas;
using api.Models;
using server.Dto;
using System.Linq.Expressions;

namespace api.Interfaces.Repositories
{
    public interface ISubAreaRepository
    {
        Task Add(SubArea subArea);
        void Update(SubArea subArea);
        void Remove(SubArea subArea);
        Task<SubArea?> GetById(int id);
        Task<SubArea?> GetByIdForRemove(int id);
        Task<IEnumerable<SubArea>> GetAll();
        Task<Paginate<SubArea>> GetPaginate(int page, int take, SubAreaFilter? filter);
        Task<IEnumerable<SubArea>> Search(Expression<Func<SubArea, bool>> predicate);
    }
}
