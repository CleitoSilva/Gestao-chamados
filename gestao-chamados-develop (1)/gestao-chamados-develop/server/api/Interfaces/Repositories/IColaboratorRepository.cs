using api.Dto.Colaborators;
using api.Models;
using server.Dto;
using System.Linq.Expressions;

namespace api.Interfaces.Repositories
{
    public interface IColaboratorRepository
    {
        Task Add(Colaborator colaborator);
        void Update(Colaborator colaborator);
        void Remove(Colaborator colaborator);
        Task<Colaborator?> GetById(int id);
        Task<Colaborator?> GetByIdForRemove(int id);
        Task<Colaborator?> GetByIdNoTracking(int id);
        Task<Colaborator?> GetByIdentification(ColaboratorIdentify identify);
        Task<IEnumerable<Colaborator>> GetAll();
        Task<IEnumerable<Colaborator>> GetAllNotInTicket(int idTicket);
        Task<Paginate<Colaborator>> GetPaginate(int page, int take, ColaboratorFilter? filter);
        Task<IEnumerable<Colaborator>> Search(Expression<Func<Colaborator, bool>> predicate);
    }
}
