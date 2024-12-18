using api.Contexts;
using api.Dto.Areas;
using api.Dto.ColaboratorCategories;
using api.Extensions;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using System.Linq.Expressions;

namespace api.Repositories
{
    public class ColaboratorCategoryRepository : IColaboratorCategoryRepository
    {
        private readonly DataContext _context;

        public ColaboratorCategoryRepository(DataContext context)
        {
            _context = context;
        }

        private IQueryable<ColaboratorCategory> ApplyFilter(IQueryable<ColaboratorCategory> colaboratorCategories, ColaboratorCategoryFilter? filter)
        {
            if (filter != null)
            {
                if (!String.IsNullOrEmpty(filter.name))
                {
                    colaboratorCategories = colaboratorCategories.Where(t => t.Name.Contains(filter.name.ToLower()));
                }

                if (!String.IsNullOrEmpty(filter.description))
                {
                    colaboratorCategories = colaboratorCategories.Where(t => t.Description.Contains(filter.description.ToLower()));
                }

                if (filter.type > 0)
                {
                    colaboratorCategories = colaboratorCategories.Where(t => t.TypeCategory == filter.type);
                }

                if (filter.enterprise != null)
                {
                    colaboratorCategories = colaboratorCategories.Where(t => t.IdEnterprise == filter.enterprise);
                }
            }

            return colaboratorCategories;
        }

        public async Task<Paginate<ColaboratorCategory>> GetPaginate(int page, int take, ColaboratorCategoryFilter? filter)
        {
            var colaboratorCategories = _context.ColaboratorCategories
                .AsSplitQuery()
                .AsNoTrackingWithIdentityResolution();

            colaboratorCategories = ApplyFilter(colaboratorCategories, filter);

            var colaboratorCategoriesList = await colaboratorCategories
                .OrderBy(x => x.Name)
                .Paginate(page, take)
                .ToListAsync();

            var colaboratorCategoriesCount = await colaboratorCategories.CountAsync();

            var pagesCount = (int)Math.Ceiling((decimal)colaboratorCategoriesCount / take);

            return new Paginate<ColaboratorCategory>()
            {
                Items = colaboratorCategoriesList,
                PageIndex = page,
                PageSize = take,
                PagesCount = pagesCount,
                ItemsCount = colaboratorCategoriesCount
            };
        }

        public async Task<ColaboratorCategory?> GetById(int id)
        {
            return await _context.ColaboratorCategories.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<ColaboratorCategory?> GetByIdForRemove(int id)
        {
            return await _context.ColaboratorCategories
                .Include(x => x.Colaborators)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<ColaboratorCategory>> GetAll()
        {
            return await _context.ColaboratorCategories.ToListAsync();
        }

        public async Task<IEnumerable<ColaboratorCategory>> Search(Expression<Func<ColaboratorCategory, bool>> predicate)
        {
            return await _context.ColaboratorCategories.Where(predicate).ToListAsync();
        }

        public async Task Add(ColaboratorCategory colaboratorCategory)
        {
            await _context.ColaboratorCategories.AddAsync(colaboratorCategory);
        }

        public void Update(ColaboratorCategory colaboratorCategory)
        {
            _context.ColaboratorCategories.Update(colaboratorCategory);
        }

        public void Remove(ColaboratorCategory colaboratorCategory)
        {
            _context.ColaboratorCategories.Remove(colaboratorCategory);
        }
    }
}
