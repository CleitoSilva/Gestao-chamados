using api.Dto.TechniqueCategories;
using api.Models;
using server.Dto;
using System.Linq.Expressions;

namespace api.Interfaces.Repositories
{
    public interface ITechniqueCategoryRepository
    {
        Task Add(TechniqueCategory techniqueCategory);
        void Update(TechniqueCategory techniqueCategory);
        void Remove(TechniqueCategory techniqueCategory);
        Task<TechniqueCategory?> GetById(int id);
        Task<TechniqueCategory?> GetByIdForRemove(int id);
        Task<TechniqueCategory?> GetByIdWithAreaNoTracking(int id);
        Task<IEnumerable<TechniqueCategory>> GetAll();
        Task<IEnumerable<TechniqueCategory>> GetAllNotInTicket(int idTicket);
        Task<Paginate<TechniqueCategory>> GetPaginate(int page, int take, TechniqueCategoryFilter? filter);
        Task<IEnumerable<TechniqueCategory>> Search(Expression<Func<TechniqueCategory, bool>> predicate);
    }
}
