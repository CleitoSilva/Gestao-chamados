using api.Dto.Colaborators;
using api.Models;
using server.Dto;

namespace api.Interfaces.Services
{
    public interface IColaboratorService
    {
        Task<Boolean> Add(Colaborator colaborator);
        Task<Boolean> Update(Colaborator colaborator);
        Task<Boolean> Remove(int colaboratorId);
        Task<Colaborator?> GetById(int id);
        Task<Colaborator?> GetByIdentification(ColaboratorIdentify identify);
        Task<Paginate<Colaborator>> GetPaginate(int page, int take, ColaboratorFilter? filter);
        Task<IEnumerable<Colaborator>> GetAll();
        Task<IEnumerable<Colaborator>> GetAllNotInTicket(int idTicket);
    }
}
