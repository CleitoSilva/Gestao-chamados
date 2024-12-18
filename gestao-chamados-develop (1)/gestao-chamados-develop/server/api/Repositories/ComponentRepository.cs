using api.Contexts;
using api.Dto.Areas;
using api.Dto.Components;
using api.Extensions;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using System.Linq.Expressions;

namespace api.Repositories
{
    public class ComponentRepository : IComponentRepository
    {
        private readonly DataContext _context;

        public ComponentRepository(DataContext context)
        {
            _context = context;
        }

        private IQueryable<Component> ApplyFilter(IQueryable<Component> components, ComponentFilter? filter)
        {
            if (filter != null)
            {
                if (!String.IsNullOrEmpty(filter.name))
                {
                    components = components.Where(t => t.Name.Contains(filter.name.ToLower()));
                }

                if (!String.IsNullOrEmpty(filter.description))
                {
                    components = components.Where(t => t.Description.Contains(filter.description.ToLower()));
                }

                if (filter.machine > 0)
                {
                    components = components.Where(t => t.IdMachine == filter.machine);
                }

                if (filter.enterprise != null)
                {
                    components = components.Where(t => t.IdEnterprise == filter.enterprise);
                }
            }

            return components;
        }

        public async Task<Paginate<Component>> GetPaginate(int page, int take, ComponentFilter? filter)
        {
            var components = _context.Components
                .Include(x => x.Machine)
                .AsSplitQuery()
                .AsNoTrackingWithIdentityResolution();

            components = ApplyFilter(components, filter);

            var componentsList = await components
                .OrderBy(x => x.Name)
                .Paginate(page, take)
                .ToListAsync();

            var componentsCount = await components.CountAsync();

            var pagesCount = (int)Math.Ceiling((decimal)componentsCount / take);

            return new Paginate<Component>()
            {
                Items = componentsList,
                PageIndex = page,
                PageSize = take,
                PagesCount = pagesCount,
                ItemsCount = componentsCount
            };
        }

        public async Task<Component?> GetById(int id)
        {
            return await _context.Components.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Component?> GetByIdForRemove(int id)
        {
            return await _context.Components
                .Include(x => x.Tickets)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Component>> GetAll()
        {
            return await _context.Components.ToListAsync();
        }

        public async Task<IEnumerable<Component>> Search(Expression<Func<Component, bool>> predicate)
        {
            return await _context.Components.Where(predicate).ToListAsync();
        }

        public async Task Add(Component component)
        {
            await _context.Components.AddAsync(component);
        }

        public void Update(Component component)
        {
            _context.Components.Update(component);
        }

        public void Remove(Component component)
        {
            _context.Components.Remove(component);
        }
    }
}
