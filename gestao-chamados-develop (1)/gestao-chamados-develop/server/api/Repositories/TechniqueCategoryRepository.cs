using api.Contexts;
using api.Dto.Components;
using api.Dto.TechniqueCategories;
using api.Extensions;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using System.Linq.Expressions;

namespace api.Repositories
{
    public class TechniqueCategoryRepository : ITechniqueCategoryRepository
    {
        private readonly DataContext _context;

        public TechniqueCategoryRepository(DataContext context)
        {
            _context = context;
        }

        private IQueryable<TechniqueCategory> ApplyFilter(IQueryable<TechniqueCategory> techniqueCategories, TechniqueCategoryFilter? filter)
        {
            if (filter != null)
            {
                if (!String.IsNullOrEmpty(filter.name))
                {
                    techniqueCategories = techniqueCategories.Where(t => t.Name.Contains(filter.name.ToLower()));
                }

                if (!String.IsNullOrEmpty(filter.description))
                {
                    techniqueCategories = techniqueCategories.Where(t => t.Description.Contains(filter.description.ToLower()));
                }

                if (filter.type > 0)
                {
                    techniqueCategories = techniqueCategories.Where(t => t.TypeCategory == filter.type);
                }

                if (filter.location > 0)
                {
                    techniqueCategories = techniqueCategories.Where(t => t.IdAreaLocationCover == filter.location);
                }

                if (filter.enterprise != null)
                {
                    techniqueCategories = techniqueCategories.Where(t => t.IdEnterprise == filter.enterprise);
                }
            }

            return techniqueCategories;
        }

        public async Task<Paginate<TechniqueCategory>> GetPaginate(int page, int take, TechniqueCategoryFilter? filter)
        {
            var techniqueCategories = _context.TechniqueCategories
                .Include(x => x.AreaLocationCover)
                .AsSplitQuery()
                .AsNoTrackingWithIdentityResolution();

            techniqueCategories = ApplyFilter(techniqueCategories, filter);

            var techniqueCategoriesList = await techniqueCategories
                .OrderBy(x => x.Description)
                .Paginate(page, take)
                .ToListAsync();

            var techniqueCategoriesCount = await techniqueCategories.CountAsync();

            var pagesCount = (int)Math.Ceiling((decimal)techniqueCategoriesCount / take);

            return new Paginate<TechniqueCategory>()
            {
                Items = techniqueCategoriesList,
                PageIndex = page,
                PageSize = take,
                PagesCount = pagesCount,
                ItemsCount = techniqueCategoriesCount
            };
        }

        public async Task<TechniqueCategory?> GetById(int id)
        {
            return await _context.TechniqueCategories.Include(x => x.Colaborators).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<TechniqueCategory?> GetByIdForRemove(int id)
        {
            return await _context.TechniqueCategories
                .Include(x => x.Tickets)
                .Include(x => x.Colaborators)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<TechniqueCategory?> GetByIdWithAreaNoTracking(int id)
        {
            return await _context.TechniqueCategories
                .Include(x => x.AreaLocationCover)
                .AsNoTrackingWithIdentityResolution()
                .AsSplitQuery()
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<TechniqueCategory>> GetAll()
        {
            return await _context.TechniqueCategories.ToListAsync();
        }

        public async Task<IEnumerable<TechniqueCategory>> GetAllNotInTicket(int idTicket)
        {
            return await _context.TechniqueCategories
                .Where(x => !x.TicketTechniques.Any(z => z.IdTicket == idTicket))
                .AsNoTrackingWithIdentityResolution()
                .ToListAsync();
        }

        public async Task<IEnumerable<TechniqueCategory>> Search(Expression<Func<TechniqueCategory, bool>> predicate)
        {
            return await _context.TechniqueCategories.Where(predicate).ToListAsync();
        }

        public async Task Add(TechniqueCategory techniqueCategory)
        {
            await _context.TechniqueCategories.AddAsync(techniqueCategory);
        }

        public void Update(TechniqueCategory techniqueCategory)
        {
            _context.TechniqueCategories.Update(techniqueCategory);
        }

        public void Remove(TechniqueCategory techniqueCategory)
        {
            _context.TechniqueCategories.Remove(techniqueCategory);
        }
    }
}
