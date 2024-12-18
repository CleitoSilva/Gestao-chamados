using api.Contexts;
using api.Dto.Components;
using api.Dto.Shifts;
using api.Extensions;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using System.Linq.Expressions;

namespace api.Repositories
{
    public class ShiftRepository : IShiftRepository
    {
        private readonly DataContext _context;

        public ShiftRepository(DataContext context)
        {
            _context = context;
        }

        private IQueryable<Shift> ApplyFilter(IQueryable<Shift> shifts, ShiftFilter? filter)
        {
            if (filter != null)
            {
                if (!String.IsNullOrEmpty(filter.description))
                {
                    shifts = shifts.Where(t => t.Description.Contains(filter.description.ToLower()));
                }

                if (filter.enterprise != null)
                {
                    shifts = shifts.Where(t => t.IdEnterprise == filter.enterprise);
                }
            }

            return shifts;
        }

        public async Task<Paginate<Shift>> GetPaginate(int page, int take, ShiftFilter? filter)
        {
            var shifts = _context.Shifts
                .AsSplitQuery()
                .AsNoTrackingWithIdentityResolution();

            shifts = ApplyFilter(shifts, filter);

            var shiftsList = await shifts
                .OrderBy(x => x.Description)
                .Paginate(page, take)
                .ToListAsync();

            var shiftsCount = await shifts.CountAsync();

            var pagesCount = (int)Math.Ceiling((decimal)shiftsCount / take);

            return new Paginate<Shift>()
            {
                Items = shiftsList,
                PageIndex = page,
                PageSize = take,
                PagesCount = pagesCount,
                ItemsCount = shiftsCount
            };
        }

        public async Task<Shift?> GetById(int id)
        {
            return await _context.Shifts.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Shift?> GetByIdForRemove(int id)
        {
            return await _context.Shifts
                .Include(x => x.Colaborators)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Shift>> GetAll()
        {
            return await _context.Shifts.ToListAsync();
        }

        public async Task<IEnumerable<Shift>> Search(Expression<Func<Shift, bool>> predicate)
        {
            return await _context.Shifts.Where(predicate).ToListAsync();
        }

        public async Task Add(Shift shift)
        {
            await _context.Shifts.AddAsync(shift);
        }

        public void Update(Shift shift)
        {
            _context.Shifts.Update(shift);
        }

        public void Remove(Shift shift)
        {
            _context.Shifts.Remove(shift);
        }
    }
}
