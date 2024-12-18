using api.Dto.Users;
using api.Models;
using server.Dto;
using System.Linq.Expressions;

namespace api.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task Add(User user);
        void Update(User user);
        void Remove(User user);
        Task<User?> GetById(Guid id);
        Task<IEnumerable<User>> GetAll();
        Task<Paginate<User>> GetPaginate(int page, int take, UserFilter? filter);
        Task<User?> GetByUserNameOrEmail(string userNameOrEmail);
        Task<IEnumerable<User>> Search(Expression<Func<User, bool>> predicate);

    }
}
