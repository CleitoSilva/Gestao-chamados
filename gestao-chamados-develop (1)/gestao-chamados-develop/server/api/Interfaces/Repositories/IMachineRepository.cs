using api.Dto.Machines;
using api.Models;
using server.Dto;
using System.Linq.Expressions;

namespace api.Interfaces.Repositories
{
    public interface IMachineRepository
    {
        Task Add(Machine machine);
        void Update(Machine machine);
        void Remove(Machine machine);
        Task<Machine?> GetById(int id);
        Task<Machine?> GetByIdForRemove(int id);
        Task<IEnumerable<Machine>> GetAll();
        Task<Paginate<Machine>> GetPaginate(int page, int take, MachineFilter? filter);
        Task<IEnumerable<Machine>> Search(Expression<Func<Machine, bool>> predicate);
    }
}
