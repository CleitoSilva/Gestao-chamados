using api.Dto.Areas;
using api.Models;
using server.Dto;

namespace api.Interfaces.Services
{
    public interface IAreaService
    {
        Task<Boolean> Add(Area area);
        Task<Boolean> Update(Area area);
        Task<Boolean> Remove(int areaId);
        Task<Area?> GetById(int id);
        Task<Paginate<Area>> GetPaginate(int page, int take, AreaFilter? filter);
        Task<IEnumerable<Area>> GetAll();
    }
}
