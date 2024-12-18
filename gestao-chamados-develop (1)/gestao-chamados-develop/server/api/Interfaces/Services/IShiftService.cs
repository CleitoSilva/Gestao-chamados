using api.Dto.Shifts;
using api.Models;
using server.Dto;

namespace api.Interfaces.Services
{
    public interface IShiftService
    {
        Task<Boolean> Add(Shift shift);
        Task<Boolean> Update(Shift shift);
        Task<Boolean> Remove(int shiftId);
        Task<Shift?> GetById(int id);
        Task<Paginate<Shift>> GetPaginate(int page, int take, ShiftFilter? filter);
        Task<IEnumerable<Shift>> GetAll();
    }
}
