using api.Contexts;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using System.Linq.Expressions;

namespace api.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly DataContext _context;

        public EventRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Event?> GetById(int id)
        {
            return await _context.Events.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Event>> GetAll()
        {
            return await _context.Events
                .AsNoTrackingWithIdentityResolution()
                .ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetAllByTicket(int idTicket)
        {
            return await _context.Events
                .Where(x => x.IdTicket == idTicket)
                .OrderBy(x => x.Timestamp)
                .AsNoTrackingWithIdentityResolution()
                .ToListAsync();
        }

        public async Task<IEnumerable<Event>> Search(Expression<Func<Event, bool>> predicate)
        {
            return await _context.Events.Where(predicate).ToListAsync();
        }

        public async Task Add(Event eventMsg)
        {
            await _context.Events.AddAsync(eventMsg);
        }

        public void Update(Event eventMsg)
        {
            _context.Events.Update(eventMsg);
        }

        public void Remove(Event eventMsg)
        {
            _context.Events.Remove(eventMsg);
        }
    }
}
