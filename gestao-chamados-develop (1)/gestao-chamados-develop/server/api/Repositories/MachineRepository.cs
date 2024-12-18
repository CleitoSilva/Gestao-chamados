using api.Contexts;
using api.Dto.Components;
using api.Dto.Machines;
using api.Extensions;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using System.Linq.Expressions;

namespace api.Repositories
{
    public class MachineRepository : IMachineRepository
    {
        private readonly DataContext _context;

        public MachineRepository(DataContext context)
        {
            _context = context;
        }

        private IQueryable<Machine> ApplyFilter(IQueryable<Machine> machines, MachineFilter? filter)
        {
            if (filter != null)
            {
                if (!String.IsNullOrEmpty(filter.name))
                {
                    machines = machines.Where(t => t.Name.Contains(filter.name.ToLower()));
                }

                if (!String.IsNullOrEmpty(filter.description))
                {
                    machines = machines.Where(t => t.Description.Contains(filter.description.ToLower()));
                }

                if (filter.line > 0)
                {
                    machines = machines.Where(t => t.IdLine == filter.line);
                }

                if (filter.order > 0)
                {
                    machines = machines.Where(t => t.Order >= filter.order);
                }

                if (filter.enterprise != null)
                {
                    machines = machines.Where(t => t.IdEnterprise == filter.enterprise);
                }
            }

            return machines;
        }

        public async Task<Paginate<Machine>> GetPaginate(int page, int take, MachineFilter? filter)
        {
            var machines = _context.Machines
                .Include(x => x.Line)
                .AsSplitQuery()
                .AsNoTrackingWithIdentityResolution();

            machines = ApplyFilter(machines, filter);

            var machinesList = await machines
                .OrderBy(x => x.Name)
                .Paginate(page, take)
                .ToListAsync();

            var machinesCount = await machines.CountAsync();

            var pagesCount = (int)Math.Ceiling((decimal)machinesCount / take);

            return new Paginate<Machine>()
            {
                Items = machinesList,
                PageIndex = page,
                PageSize = take,
                PagesCount = pagesCount,
                ItemsCount = machinesCount
            };
        }

        public async Task<Machine?> GetById(int id)
        {
            return await _context.Machines.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Machine?> GetByIdForRemove(int id)
        {
            return await _context.Machines
                .Include(x => x.Tickets)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Machine>> GetAll()
        {
            return await _context.Machines.Include(x => x.Line).ToListAsync();
        }

        public async Task<IEnumerable<Machine>> Search(Expression<Func<Machine, bool>> predicate)
        {
            return await _context.Machines.Where(predicate).ToListAsync();
        }

        public async Task Add(Machine machine)
        {
            await _context.Machines.AddAsync(machine);
        }

        public void Update(Machine machine)
        {
            _context.Machines.Update(machine);
        }

        public void Remove(Machine machine)
        {
            _context.Machines.Remove(machine);
        }
    }
}
