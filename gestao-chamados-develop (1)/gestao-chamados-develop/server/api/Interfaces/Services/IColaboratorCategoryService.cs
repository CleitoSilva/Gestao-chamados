using api.Dto.ColaboratorCategories;
using api.Models;
using server.Dto;

namespace api.Interfaces.Services
{
    public interface IColaboratorCategoryService
    {
        Task<Boolean> Add(ColaboratorCategory colaboratorCategory);
        Task<Boolean> Update(ColaboratorCategory colaboratorCategory);
        Task<Boolean> Remove(int colaboratorCategoryId);
        Task<ColaboratorCategory?> GetById(int id);
        Task<Paginate<ColaboratorCategory>> GetPaginate(int page, int take, ColaboratorCategoryFilter? filter);
        Task<IEnumerable<ColaboratorCategory>> GetAll();
    }
}
