using api.Dto.Shifts;
using api.Models;
using server.Dto;
using System.Linq.Expressions;

namespace api.Interfaces.Repositories
{
    public interface IShiftRepository
    {
        Task Add(Shift shift);
        void Update(Shift shift);
        void Remove(Shift shift);
        Task<Shift?> GetById(int id);
        Task<Shift?> GetByIdForRemove(int id);
        Task<IEnumerable<Shift>> GetAll();
        Task<Paginate<Shift>> GetPaginate(int page, int take, ShiftFilter? filter);
        Task<IEnumerable<Shift>> Search(Expression<Func<Shift, bool>> predicate);
    }
}
