using api.Base;
using api.Interfaces.Repositories;
using api.Interfaces;
using api.Interfaces.Services;
using api.Models;
using api.Notifications;
using api.Validations;
using server.Dto;
using api.Dto.Users;

namespace api.Services
{
    public class UserService : BaseService, IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository, IUnitOfWork uow, INotificator notificator) : base(uow, notificator)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _userRepository.GetAll();
        }

        public async Task<User?> GetById(Guid id)
        {
            return await _userRepository.GetById(id);
        }

        public async Task<Paginate<User>> GetPaginate(int page, int take, UserFilter? filter)
        {
            return await _userRepository.GetPaginate(page, take, filter);
        }

        public async Task<User?> GetByUserNameOrEmail(string userNameOrEmail)
        {
            return await _userRepository.GetByUserNameOrEmail(userNameOrEmail);
        }

        public async Task<bool> Add(User user)
        {
            if (user == null)
            {
                AddNotification("Usuário fornecido é nulo");
                return false;
            }

            if (!ValidateObject<User>(new UserValidation(), user))
            {
                return false;
            }

            if (_userRepository.Search(x => x.UserName == user.UserName || x.Email == user.Email).Result.Any())
            {
                AddNotification("Já existe usuário cadastrado cadastrado com esse email ou com esse usuário");
                return false;
            }

            await _userRepository.Add(user);

            return await PersistChanges();
        }

        public async Task<bool> Update(User user)
        {
            if (user == null)
            {
                AddNotification("Usuário fornecido é nulo");
                return false;
            }

            if (!ValidateObject<User>(new UserValidation(), user))
            {
                return false;
            }

            if (_userRepository.Search(x => (x.UserName == user.UserName || x.Email == user.Email) && x.Id != user.Id).Result.Any())
            {
                AddNotification("Já existe usuário cadastrado cadastrado com esse email ou com esse usuário");
                return false;
            }

            _userRepository.Update(user);

            return await PersistChanges();
        }

        public async Task<bool> Remove(Guid userId)
        {
            var user = await _userRepository.GetById(userId);

            if (user == null)
            {
                AddNotification("Não existe usuário com esse Id.");
                return false;
            }

            _userRepository.Remove(user);

            return await PersistChanges();
        }
    }
}
