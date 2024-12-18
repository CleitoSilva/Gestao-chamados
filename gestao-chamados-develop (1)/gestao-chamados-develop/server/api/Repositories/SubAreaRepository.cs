using api.Contexts;
using api.Dto.Components;
using api.Dto.SubAreas;
using api.Extensions;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using System.Linq.Expressions;

namespace api.Repositories
{
    public class SubAreaRepository : ISubAreaRepository
    {
        private readonly DataContext _context;

        public SubAreaRepository(DataContext context)
        {
            _context = context;
        }

        private IQueryable<SubArea> ApplyFilter(IQueryable<SubArea> subAreas, SubAreaFilter? filter)
        {
            if (filter != null)
            {
                if (!String.IsNullOrEmpty(filter.name))
                {
                    subAreas = subAreas.Where(t => t.Name.Contains(filter.name.ToLower()));
                }

                if (!String.IsNullOrEmpty(filter.description))
                {
                    subAreas = subAreas.Where(t => t.Description.Contains(filter.description.ToLower()));
                }

                if (filter.area > 0)
                {
                    subAreas = subAreas.Where(t => t.IdArea == filter.area);
                }

                if (filter.enterprise != null)
                {
                    subAreas = subAreas.Where(t => t.IdEnterprise == filter.enterprise);
                }
            }

            return subAreas;
        }

        public async Task<Paginate<SubArea>> GetPaginate(int page, int take, SubAreaFilter? filter)
        {
            var subAreas = _context.SubAreas
                .Include(x => x.Area)
                .AsSplitQuery()
                .AsNoTrackingWithIdentityResolution();

            subAreas = ApplyFilter(subAreas, filter);

            var subAreasList = await subAreas
                .OrderBy(x => x.Description)
                .Paginate(page, take)
                .ToListAsync();

            var subAreasCount = await subAreas.CountAsync();

            var pagesCount = (int)Math.Ceiling((decimal)subAreasCount / take);

            return new Paginate<SubArea>()
            {
                Items = subAreasList,
                PageIndex = page,
                PageSize = take,
                PagesCount = pagesCount,
                ItemsCount = subAreasCount
            };
        }

        public async Task<SubArea?> GetById(int id)
        {
            return await _context.SubAreas.Include(x => x.Lines).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<SubArea?> GetByIdForRemove(int id)
        {
            return await _context.SubAreas
                .Include(x => x.Tickets)
                .Include(x => x.Lines)
                .ThenInclude(x => x.Colaborators)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<SubArea>> GetAll()
        {
            return await _context.SubAreas.Include(x => x.Area).ToListAsync();
        }

        public async Task<IEnumerable<SubArea>> Search(Expression<Func<SubArea, bool>> predicate)
        {
            return await _context.SubAreas.Where(predicate).ToListAsync();
        }

        public async Task Add(SubArea subArea)
        {
            await _context.SubAreas.AddAsync(subArea);
        }

        public void Update(SubArea subArea)
        {
            _context.SubAreas.Update(subArea);
        }

        public void Remove(SubArea subArea)
        {
            _context.SubAreas.Remove(subArea);
        }
    }
}
