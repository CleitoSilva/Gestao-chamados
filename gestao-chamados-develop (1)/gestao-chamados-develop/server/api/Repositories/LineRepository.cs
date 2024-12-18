using api.Contexts;
using api.Dto.Areas;
using api.Dto.Lines;
using api.Extensions;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using System.Linq.Expressions;

namespace api.Repositories
{
    public class LineRepository : ILineRepository
    {
        private readonly DataContext _context;

        public LineRepository(DataContext context)
        {
            _context = context;
        }

        private IQueryable<Line> ApplyFilter(IQueryable<Line> lines, LineFilter? filter)
        {
            if (filter != null)
            {
                if (!String.IsNullOrEmpty(filter.name))
                {
                    lines = lines.Where(t => t.Name.Contains(filter.name.ToLower()));
                }

                if (!String.IsNullOrEmpty(filter.description))
                {
                    lines = lines.Where(t => t.Description.Contains(filter.description.ToLower()));
                }

                if (filter.number > 0)
                {
                    lines = lines.Where(t => t.Number == filter.number);
                }

                if (filter.area > 0)
                {
                    lines = lines.Where(t => t.IdArea == filter.area);
                }

                if (filter.subarea > 0)
                {
                    lines = lines.Where(t => t.IdSubArea == filter.subarea);
                }

                if (filter.enterprise != null)
                {
                    lines = lines.Where(t => t.IdEnterprise == filter.enterprise);
                }
            }

            return lines;
        }

        public async Task<Paginate<Line>> GetPaginate(int page, int take, LineFilter? filter)
        {
            var lines = _context.Lines
                .Include(x => x.Area)
                .Include(x => x.SubArea)
                .AsSplitQuery()
                .AsNoTrackingWithIdentityResolution();

            lines = ApplyFilter(lines, filter);

            var linesList = await lines
                .OrderBy(x => x.Name)
                .Paginate(page, take)
                .ToListAsync();

            var linesCount = await lines.CountAsync();

            var pagesCount = (int)Math.Ceiling((decimal)linesCount / take);

            return new Paginate<Line>()
            {
                Items = linesList,
                PageIndex = page,
                PageSize = take,
                PagesCount = pagesCount,
                ItemsCount = linesCount
            };
        }

        public async Task<Line?> GetById(int id)
        {
            return await _context.Lines.Include(x => x.Colaborators).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Line?> GetByIdForRemove(int id)
        {
            return await _context.Lines
                .Include(x => x.Tickets)
                .Include(x => x.Colaborators)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Line>> GetAll()
        {
            return await _context.Lines.Include(x => x.Area).Include(x => x.SubArea).ToListAsync();
        }

        public async Task<IEnumerable<Line>> Search(Expression<Func<Line, bool>> predicate)
        {
            return await _context.Lines.Where(predicate).ToListAsync();
        }

        public async Task Add(Line line)
        {
            await _context.Lines.AddAsync(line);
        }

        public void Update(Line line)
        {
            _context.Lines.Update(line);
        }

        public void Remove(Line line)
        {
            _context.Lines.Remove(line);
        }
    }
}
