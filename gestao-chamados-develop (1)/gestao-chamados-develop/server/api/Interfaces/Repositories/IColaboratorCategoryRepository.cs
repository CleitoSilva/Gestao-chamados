using api.Dto.ColaboratorCategories;
using api.Models;
using server.Dto;
using System.Linq.Expressions;

namespace api.Interfaces.Repositories
{
    public interface IColaboratorCategoryRepository
    {
        Task Add(ColaboratorCategory colaboratorCategory);
        void Update(ColaboratorCategory colaboratorCategory);
        void Remove(ColaboratorCategory colaboratorCategory);
        Task<ColaboratorCategory?> GetById(int id);
        Task<ColaboratorCategory?> GetByIdForRemove(int id);
        Task<IEnumerable<ColaboratorCategory>> GetAll();
        Task<Paginate<ColaboratorCategory>> GetPaginate(int page, int take, ColaboratorCategoryFilter? filter);
        Task<IEnumerable<ColaboratorCategory>> Search(Expression<Func<ColaboratorCategory, bool>> predicate);
    }
}
