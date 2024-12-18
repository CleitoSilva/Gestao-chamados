using api.Contexts;
using api.Dto.Areas;
using api.Dto.Enterprises;
using api.Extensions;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using System.Linq.Expressions;

namespace api.Repositories
{
    public class EnterpriseRepository : IEnterpriseRepository
    {
        private readonly DataContext _context;

        public EnterpriseRepository(DataContext context)
        {
            _context = context;
        }

        private IQueryable<Enterprise> ApplyFilter(IQueryable<Enterprise> enterprises, EnterpriseFilter? filter)
        {
            if (filter != null)
            {
                if (!String.IsNullOrEmpty(filter.name))
                {
                    enterprises = enterprises.Where(t => t.Name.Contains(filter.name.ToLower()));
                }

                if (!String.IsNullOrEmpty(filter.description))
                {
                    enterprises = enterprises.Where(t => t.Description.Contains(filter.description.ToLower()));
                }
            }

            return enterprises;
        }

        public async Task<Paginate<Enterprise>> GetPaginate(int page, int take, EnterpriseFilter? filter)
        {
            var enterprises = _context.Enterprises
                .AsSplitQuery()
                .AsNoTrackingWithIdentityResolution();

            enterprises = ApplyFilter(enterprises, filter);

            var enterprisesList = await enterprises
                .OrderBy(x => x.Name)
                .Paginate(page, take)
                .ToListAsync();

            var enterprisesCount = await enterprises.CountAsync();

            var pagesCount = (int)Math.Ceiling((decimal)enterprisesCount / take);

            return new Paginate<Enterprise>()
            {
                Items = enterprisesList,
                PageIndex = page,
                PageSize = take,
                PagesCount = pagesCount,
                ItemsCount = enterprisesCount
            };
        }

        public async Task<Enterprise?> GetById(Guid id)
        {
            return await _context.Enterprises.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Enterprise?> GetByIdForRemove(Guid id)
        {
            return await _context.Enterprises
                .Include(x => x.SubAreas)
                .Include(x => x.Lines)
                .Include(x => x.Machines)
                .Include(x => x.Components)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Enterprise>> GetAll()
        {
            return await _context.Enterprises.ToListAsync();
        }

        public async Task<IEnumerable<Enterprise>> Search(Expression<Func<Enterprise, bool>> predicate)
        {
            return await _context.Enterprises.Where(predicate).ToListAsync();
        }

        public async Task Add(Enterprise enterprise)
        {
            await _context.Enterprises.AddAsync(enterprise);
        }

        public void Update(Enterprise enterprise)
        {
            _context.Enterprises.Update(enterprise);
        }

        public void Remove(Enterprise enterprise)
        {
            _context.Enterprises.Remove(enterprise);
        }
    }
}
