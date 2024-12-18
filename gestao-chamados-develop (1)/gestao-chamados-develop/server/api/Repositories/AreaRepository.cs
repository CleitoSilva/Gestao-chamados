using api.Contexts;
using api.Dto.Areas;
using api.Extensions;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using System.Linq.Expressions;

namespace api.Repositories
{
    public class AreaRepository : IAreaRepository
    {
        private readonly DataContext _context;

        public AreaRepository(DataContext context)
        {
            _context = context;
        }

        private IQueryable<Area> ApplyFilter(IQueryable<Area> areas, AreaFilter? filter)
        {
            if (filter != null)
            {
                if (!String.IsNullOrEmpty(filter.name))
                {
                    areas = areas.Where(t => t.Name.Contains(filter.name.ToLower()));
                }

                if (!String.IsNullOrEmpty(filter.description))
                {
                    areas = areas.Where(t => t.Description.Contains(filter.description.ToLower()));
                }

                if (filter.enterprise != null)
                {
                    areas = areas.Where(t => t.IdEnterprise == filter.enterprise);
                }
            }

            return areas;
        }


        public async Task<Paginate<Area>> GetPaginate(int page, int take, AreaFilter? filter)
        {
            var areas = _context.Areas
                .AsSplitQuery()
                .AsNoTrackingWithIdentityResolution();

            areas = ApplyFilter(areas, filter);

            var areasList = await areas
                .OrderBy(x => x.Name)
                .Paginate(page, take)
                .ToListAsync();

            var areasCount = await areas.CountAsync();

            var pagesCount = (int)Math.Ceiling((decimal)areasCount / take);

            return new Paginate<Area>()
            {
                Items = areasList,
                PageIndex = page,
                PageSize = take,
                PagesCount = pagesCount,
                ItemsCount = areasCount
            };
        }

        public async Task<Area?> GetById(int id)
        {
            return await _context.Areas
                .Include(x => x.Lines)
                .ThenInclude(x => x.Colaborators)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Area?> GetByIdForRemove(int id)
        {
            return await _context.Areas
                .Include(x => x.Tickets)
                .Include(x => x.TechniqueCategories)
                .Include(x => x.Lines)
                .ThenInclude(x => x.Colaborators)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Area>> GetAll()
        {
            return await _context.Areas.ToListAsync();
        }

        public async Task<IEnumerable<Area>> Search(Expression<Func<Area, bool>> predicate)
        {
            return await _context.Areas.Where(predicate).ToListAsync();
        }

        public async Task Add(Area area)
        {
            await _context.Areas.AddAsync(area);
        }

        public void Update(Area area)
        {
            _context.Areas.Update(area);
        }

        public void Remove(Area area)
        {
            _context.Areas.Remove(area);
        }
    }
}
