using api.Contexts;
using api.Dto.Components;
using api.Dto.Users;
using api.Extensions;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using System.Linq.Expressions;

namespace api.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        private IQueryable<User> ApplyFilter(IQueryable<User> users, UserFilter? filter)
        {
            if (filter != null)
            {
                if (!String.IsNullOrEmpty(filter.username))
                {
                    users = users.Where(t => t.UserName.Contains(filter.username.ToLower()));
                }

                if (!String.IsNullOrEmpty(filter.name))
                {
                    users = users.Where(t => t.Name.Contains(filter.name.ToLower()));
                }

                if (!String.IsNullOrEmpty(filter.email))
                {
                    users = users.Where(t => t.Email.Contains(filter.email.ToLower()));
                }

                if (filter.enterprise != null)
                {
                    users = users.Where(t => t.IdEnterprise == filter.enterprise);
                }
            }

            return users;
        }

        public async Task<Paginate<User>> GetPaginate(int page, int take, UserFilter? filter)
        {
            var users = _context.Users
                .AsSplitQuery()
                .AsNoTrackingWithIdentityResolution();

            users = ApplyFilter(users, filter);

            var usersList = await users
                .OrderBy(x => x.Name)
                .Paginate(page, take)
                .ToListAsync();

            var usersCount = await users.CountAsync();

            var pagesCount = (int)Math.Ceiling((decimal)usersCount / take);

            return new Paginate<User>()
            {
                Items = usersList,
                PageIndex = page,
                PageSize = take,
                PagesCount = pagesCount,
                ItemsCount = usersCount
            };
        }

        public async Task<User?> GetById(Guid id)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<User?> GetByUserNameOrEmail(string userNameOrEmail)
        {
            return await _context.Users
                .AsNoTrackingWithIdentityResolution()
                .FirstOrDefaultAsync(x => x.UserName == userNameOrEmail || x.Email == userNameOrEmail);
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<IEnumerable<User>> Search(Expression<Func<User, bool>> predicate)
        {
            return await _context.Users.Where(predicate).ToListAsync();
        }

        public async Task Add(User user)
        {
            await _context.Users.AddAsync(user);
        }

        public void Update(User user)
        {
            _context.Users.Update(user);
        }

        public void Remove(User user)
        {
            _context.Users.Remove(user);
        }

        
    }
}
