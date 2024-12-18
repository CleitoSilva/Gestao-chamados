using api.Dto.SubAreas;
using api.Models;
using server.Dto;

namespace api.Interfaces.Services
{
    public interface ISubAreaService
    {
        Task<Boolean> Add(SubArea subArea);
        Task<Boolean> Update(SubArea subArea);
        Task<Boolean> Remove(int subAreaId);
        Task<SubArea?> GetById(int id);
        Task<Paginate<SubArea>> GetPaginate(int page, int take, SubAreaFilter? filter);
        Task<IEnumerable<SubArea>> GetAll();
    }
}
