using api.Dto.Users;
using api.Models;
using server.Dto;

namespace api.Interfaces.Services
{
    public interface IUserService
    {
        Task<Boolean> Add(User user);
        Task<Boolean> Update(User user);
        Task<Boolean> Remove(Guid userId);
        Task<User?> GetById(Guid id);
        Task<Paginate<User>> GetPaginate(int page, int take, UserFilter? filter);
        Task<User?> GetByUserNameOrEmail(string userNameOrEmail);
        Task<IEnumerable<User>> GetAll();
    }
}
