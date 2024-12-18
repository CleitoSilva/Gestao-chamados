using api.Contexts;
using api.Dto.Areas;
using api.Dto.Colaborators;
using api.Extensions;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using System.Linq.Expressions;

namespace api.Repositories
{
    public class ColaboratorRepository : IColaboratorRepository
    {
        private readonly DataContext _context;

        public ColaboratorRepository(DataContext context)
        {
            _context = context;
        }

        private IQueryable<Colaborator> ApplyFilter(IQueryable<Colaborator> colaborators, ColaboratorFilter? filter)
        {
            if (filter != null)
            {
                if (!String.IsNullOrEmpty(filter.name))
                {
                    colaborators = colaborators.Where(t => t.Name.Contains(filter.name.ToLower()));
                }

                if (!String.IsNullOrEmpty(filter.badge))
                {
                    colaborators = colaborators.Where(t => t.BadgeCardNumber.Contains(filter.badge.ToLower()));
                }

                if (!String.IsNullOrEmpty(filter.rfid))
                {
                    colaborators = colaborators.Where(t => t.RFIDCardNumber.Contains(filter.rfid.ToLower()));
                }

                if (!String.IsNullOrEmpty(filter.re))
                {
                    colaborators = colaborators.Where(t => t.RENumber.Contains(filter.re.ToLower()));
                }

                if (filter.category > 0)
                {
                    colaborators = colaborators.Where(t => t.IdColaboratorCategory == filter.category);
                }

                if (filter.technique > 0)
                {
                    colaborators = colaborators.Where(t => t.IdTechniqueCategory == filter.technique);
                }

                if (filter.shift > 0)
                {
                    colaborators = colaborators.Where(t => t.IdShift == filter.shift);
                }

                if (filter.line > 0)
                {
                    colaborators = colaborators.Where(t => t.IdLine == filter.line);
                }

                if (filter.enterprise != null)
                {
                    colaborators = colaborators.Where(t => t.IdEnterprise == filter.enterprise);
                }
            }

            return colaborators;
        }

        public async Task<Paginate<Colaborator>> GetPaginate(int page, int take, ColaboratorFilter? filter)
        {
            var colaborators = _context.Colaborators
                .Include(x => x.TechniqueCategory)
                .Include(x => x.Shift)
                .Include(x => x.Line)
                .AsSplitQuery()
                .AsNoTrackingWithIdentityResolution();

            colaborators = ApplyFilter(colaborators, filter);

            var colaboratorsList = await colaborators
                .OrderBy(x => x.Name)
                .Paginate(page, take)
                .ToListAsync();

            var colaboratorsCount = await colaborators.CountAsync();

            var pagesCount = (int)Math.Ceiling((decimal)colaboratorsCount / take);

            return new Paginate<Colaborator>()
            {
                Items = colaboratorsList,
                PageIndex = page,
                PageSize = take,
                PagesCount = pagesCount,
                ItemsCount = colaboratorsCount
            };
        }

        public async Task<Colaborator?> GetById(int id)
        {
            return await _context.Colaborators.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Colaborator?> GetByIdForRemove(int id)
        {
            return await _context.Colaborators
                .Include(x => x.WorkedTickets)
                .Include(x => x.OpenedTickes)
                .Include(x => x.ResponsibleTickets)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Colaborator?> GetByIdNoTracking(int id)
        {
            return await _context.Colaborators
                .Include(x => x.TechniqueCategory)
                .AsNoTrackingWithIdentityResolution()
                .AsSplitQuery()
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Colaborator?> GetByIdentification(ColaboratorIdentify identify)
        {
            return await _context.Colaborators
                .Include(x => x.TechniqueCategory)
                .AsNoTrackingWithIdentityResolution()
                .AsSplitQuery()
                .FirstOrDefaultAsync(x => 
                    (identify.Badge != null && x.BadgeCardNumber == identify.Badge) ||
                    (identify.Rfid != null && x.RFIDCardNumber == identify.Rfid) ||
                    (identify.Re != null && x.RENumber == identify.Re)
                );
        }

        public async Task<IEnumerable<Colaborator>> GetAll()
        {
            return await _context.Colaborators.ToListAsync();
        }

        public async Task<IEnumerable<Colaborator>> GetAllNotInTicket(int idTicket)
        {
            return await _context.Colaborators
                .Include(x => x.TechniqueCategory)
                .Where(x => !x.WorkedTickets.Any(z => z.IdTicket == idTicket))
                .AsNoTrackingWithIdentityResolution()
                .AsSplitQuery()
                .ToListAsync();
        }

        public async Task<IEnumerable<Colaborator>> Search(Expression<Func<Colaborator, bool>> predicate)
        {
            return await _context.Colaborators.Where(predicate).ToListAsync();
        }

        public async Task Add(Colaborator colaborator)
        {
            await _context.Colaborators.AddAsync(colaborator);
        }

        public void Update(Colaborator colaborator)
        {
            _context.Colaborators.Update(colaborator);
        }

        public void Remove(Colaborator colaborator)
        {
            _context.Colaborators.Remove(colaborator);
        }
    }
}
