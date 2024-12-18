using api.Dto.Machines;
using api.Models;
using server.Dto;

namespace api.Interfaces.Services
{
    public interface IMachineService
    {
        Task<Boolean> Add(Machine machine);
        Task<Boolean> Update(Machine machine);
        Task<Boolean> Remove(int machineId);
        Task<Machine?> GetById(int id);
        Task<Paginate<Machine>> GetPaginate(int page, int take, MachineFilter? filter);
        Task<IEnumerable<Machine>> GetAll();
    }
}
