using api.Dto.Components;
using api.Models;
using server.Dto;

namespace api.Interfaces.Services
{
    public interface IComponentService
    {
        Task<Boolean> Add(Component component);
        Task<Boolean> Update(Component component);
        Task<Boolean> Remove(int componentId);
        Task<Component?> GetById(int id);
        Task<Paginate<Component>> GetPaginate(int page, int take, ComponentFilter? filter);
        Task<IEnumerable<Component>> GetAll();
    }
}
