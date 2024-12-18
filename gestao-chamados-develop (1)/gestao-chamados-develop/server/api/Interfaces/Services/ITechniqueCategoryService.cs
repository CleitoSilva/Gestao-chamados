using api.Dto.TechniqueCategories;
using api.Models;
using server.Dto;

namespace api.Interfaces.Services
{
    public interface ITechniqueCategoryService
    {
        Task<Boolean> Add(TechniqueCategory techniqueCategory);
        Task<Boolean> Update(TechniqueCategory techniqueCategory);
        Task<Boolean> Remove(int techniqueCategoryId);
        Task<TechniqueCategory?> GetById(int id);
        Task<Paginate<TechniqueCategory>> GetPaginate(int page, int take, TechniqueCategoryFilter? filter);
        Task<IEnumerable<TechniqueCategory>> GetAll();
        Task<IEnumerable<TechniqueCategory>> GetAllNotInTicket(int idTicket);
    }
}
