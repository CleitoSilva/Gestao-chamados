using api.Contexts;
using api.Dto.Tickets;
using api.Extensions;
using api.Helpers.Enums;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using System.Linq.Expressions;

namespace api.Repositories
{
    public class TicketRepository : ITicketRepository
    {
        private readonly DataContext _context;

        public TicketRepository(DataContext context)
        {
            _context = context;
        }

        private IQueryable<Ticket> ApplyFilter(IQueryable<Ticket> tickets, TicketFilter? filter)
        {
            if (filter != null)
            {
                if (filter.status > 0)
                {
                    tickets = tickets.Where(t => t.Status == filter.status);
                }

                if (filter.colaborator != null && filter.colaborator > 0)
                {
                    tickets = tickets.Where(t => t.IdOpenColaborator == filter.colaborator);
                }

                if (filter.responsible != null && filter.responsible > 0)
                {
                    tickets = tickets.Where(t => t.IdResponsibleManutentor == filter.responsible);
                }

                if (filter.area != null && filter.area > 0)
                {
                    tickets = tickets.Where(t => t.IdArea == filter.area);
                }

                if (filter.subarea != null && filter.subarea > 0)
                {
                    tickets = tickets.Where(t => t.IdSubArea == filter.subarea);
                }

                if (filter.line != null && filter.line > 0)
                {
                    tickets = tickets.Where(t => t.IdLine == filter.line);
                }

                if (filter.machine != null && filter.machine > 0)
                {
                    tickets = tickets.Where(t => t.IdMachine == filter.machine);
                }

                if (filter.component != null && filter.component > 0)
                {
                    tickets = tickets.Where(t => t.IdComponent == filter.component);
                }

                if (filter.technique != null && filter.technique > 0)
                {
                    tickets = tickets.Where(t => t.IdTechniqueCategory == filter.technique);
                }

                if (filter.enterprise != null)
                {
                    tickets = tickets.Where(t => t.IdEnterprise == filter.enterprise);
                }

                if (filter.createdDate != null)
                {
                    tickets = tickets.Where(t => t.CreatedDate > filter.createdDate);
                }
            }

            return tickets;
        }

        public async Task<Paginate<Ticket>> GetPaginate(int page, int take, TicketFilter? filter)
        {
            var tickets = _context.Tickets
                .AsSplitQuery()
                .AsNoTrackingWithIdentityResolution();

            tickets = ApplyFilter(tickets, filter);

            var ticketsList = await tickets
                .OrderBy(x => x.CreatedDate)
                .Paginate(page, take)
                .ToListAsync();

            var ticketsCount = await tickets.CountAsync();

            var pagesCount = (int)Math.Ceiling((decimal)ticketsCount / take);

            return new Paginate<Ticket>()
            {
                Items = ticketsList,
                PageIndex = page,
                PageSize = take,
                PagesCount = pagesCount,
                ItemsCount = ticketsCount
            };
        }

        public async Task<Ticket?> GetById(int id)
        {
            return await _context.Tickets.FirstOrDefaultAsync(x => x.Id == id);
        }

        //Lista chamados ativos
        public async Task<Paginate<Ticket>> GetPaginateWorkshop(int page, int take, TicketFilter? filter, int idTechniqueCategory)
        {
            var tickets = _context.Tickets
                .Include(x => x.Techniques)
                .Include(x => x.Area)
                .Include(x => x.SubArea)
                .Include(x => x.Line)
                .Include(x => x.Machine)
                .Include(x => x.OpenColaborator)
                .AsSplitQuery()
                .AsNoTrackingWithIdentityResolution()
                .Where(x => x.Techniques.Any(a => a.IdTechniqueCategory == idTechniqueCategory) && x.Status < (int) TicketStatus.CANCELED);

            tickets = ApplyFilter(tickets, filter);

            var ticketsList = await tickets
                .OrderByDescending(x => x.CreatedDate)
                .Paginate(page, take)
                .ToListAsync();

            var ticketsCount = await tickets.CountAsync();

            var pagesCount = (int)Math.Ceiling((decimal)ticketsCount / take);

            return new Paginate<Ticket>()
            {
                Items = ticketsList,
                PageIndex = page,
                PageSize = take,
                PagesCount = pagesCount,
                ItemsCount = ticketsCount
            };
        }

        public async Task<Ticket?> GetByIdForRemove(int id)
        {
            return await _context.Tickets
                .Include(x => x.Colaborators)
                .Include(x => x.Techniques)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Ticket?> GetByIdNoTracking(int id)
        {
            return await _context.Tickets
                .AsNoTrackingWithIdentityResolution()
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Ticket?> GetByIdWithEventsAndColaboratorsNoTracking(int id)
        {
            return await _context.Tickets
                .Include(x => x.Area)
                .Include(x => x.SubArea)
                .Include(x => x.Line)
                .Include(x => x.Machine)
                .Include(x => x.Component)
                .Include(x => x.OpenColaborator)
                .Include(x => x.Events)
                .Include(x => x.Colaborators)
                .ThenInclude(x => x.Colaborator)
                .ThenInclude(x => x.TechniqueCategory)
                .Include(x => x.Techniques)
                .ThenInclude(x => x.TechniqueCategory)
                .AsNoTrackingWithIdentityResolution()
                .AsSplitQuery()
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Ticket?> GetByIdWithOpenEntities(int id)
        {
            return await _context.Tickets
                .Include(x => x.OpenColaborator)
                .Include(x => x.Area)
                .Include(x => x.SubArea)
                .Include(x => x.Line)
                .Include(x => x.Machine)
                .Include(x => x.Component)
                .Include(x => x.TechniqueCategory)
                .AsNoTrackingWithIdentityResolution()
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Ticket>> GetAll()
        {
            return await _context.Tickets
                .AsNoTrackingWithIdentityResolution()
                .ToListAsync();
        }

        public async Task<IEnumerable<Ticket>> GetAllLiveByTechCategory(int idTechCategory)
        {
            return await _context.Tickets
                .AsNoTrackingWithIdentityResolution()
                .Where(x => x.Techniques.Any(x => x.IdTechniqueCategory == idTechCategory) && x.Status <= (int)TicketStatus.PAUSED)
                .OrderByDescending(x => x.CreatedDate)
                .ToListAsync();
        }

        public async Task<IEnumerable<Ticket>> GetAllLiveByUserCreate(string userName)
        {
            return await _context.Tickets
                .AsNoTrackingWithIdentityResolution()
                .Where(x => x.UserCreate == userName && x.Status <= (int)TicketStatus.PAUSED)
                .OrderByDescending(x => x.CreatedDate)
                .ToListAsync();
        }

        public async Task<IEnumerable<Ticket>> Search(Expression<Func<Ticket, bool>> predicate)
        {
            return await _context.Tickets.Where(predicate).ToListAsync();
        }

        public async Task Add(Ticket ticket)
        {
            await _context.Tickets.AddAsync(ticket);
        }

        public void Update(Ticket ticket)
        {
            _context.Tickets.Update(ticket);
        }

        public void Remove(Ticket ticket)
        {
            _context.Tickets.Remove(ticket);
        }
    }
}
