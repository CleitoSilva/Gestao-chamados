using Microsoft.EntityFrameworkCore;
using api.Contexts;
using api.Interfaces;
using api.Interfaces.Services;

namespace api.Base
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly ICurrentUserService _currentUserService;

        public UnitOfWork(DataContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<int> Commit()
        {
            try
            {
                foreach (var entry in _context.ChangeTracker.Entries())
                {
                    if (entry.State == EntityState.Added)
                    {
                        if (entry.Entity.GetType().GetProperty("CreatedDate") != null)
                        {
                            entry.Property("CreatedDate").CurrentValue = DateTime.UtcNow;
                        }

                        if (entry.Entity.GetType().GetProperty("UserCreate") != null)
                        {
                            entry.Property("UserCreate").CurrentValue = _currentUserService.GetUserName();
                        }
                    }

                    if (entry.State == EntityState.Modified || entry.State == EntityState.Added)
                    {
                        if (entry.Entity.GetType().GetProperty("UpdatedDate") != null)
                        {
                            entry.Property("UpdatedDate").CurrentValue = DateTime.UtcNow;
                        }

                        if (entry.Entity.GetType().GetProperty("UserUpdate") != null)
                        {
                            entry.Property("UserUpdate").CurrentValue = _currentUserService.GetUserName();
                        }
                    }
                }

                int saved = await _context.SaveChangesAsync();

                return saved;
            } 
            catch (Exception)
            {
                return 0;
            }
        }
    }
}
