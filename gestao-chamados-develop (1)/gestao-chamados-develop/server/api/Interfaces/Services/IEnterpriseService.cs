using api.Dto.Enterprises;
using api.Models;
using server.Dto;

namespace api.Interfaces.Services
{
    public interface IEnterpriseService
    {
        Task<Boolean> Add(Enterprise enterprise);
        Task<Boolean> Update(Enterprise enterprise);
        Task<Boolean> Remove(Guid enterpriseId);
        Task<Enterprise?> GetById(Guid id);
        Task<Paginate<Enterprise>> GetPaginate(int page, int take, EnterpriseFilter? filter);
        Task<IEnumerable<Enterprise>> GetAll();
    }
}
