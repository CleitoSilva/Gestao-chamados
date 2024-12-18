using api.Dto.Components;
using api.Models;
using server.Dto;
using System.Linq.Expressions;

namespace api.Interfaces.Repositories
{
    public interface IComponentRepository
    {
        Task Add(Component component);
        void Update(Component component);
        void Remove(Component component);
        Task<Component?> GetById(int id);
        Task<Component?> GetByIdForRemove(int id);
        Task<IEnumerable<Component>> GetAll();
        Task<Paginate<Component>> GetPaginate(int page, int take, ComponentFilter? filter);
        Task<IEnumerable<Component>> Search(Expression<Func<Component, bool>> predicate);
    }
}
