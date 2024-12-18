using api.Contexts;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using System.Linq.Expressions;

namespace api.Repositories
{
    public class TicketColaboratorRepository : ITicketColaboratorRepository
    {
        private readonly DataContext _context;

        public TicketColaboratorRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<TicketColaborator?> GetById(int idColaborator, int idTicket)
        {
            return await _context.TicketColaborators.FirstOrDefaultAsync(x => x.IdColaborator == idColaborator && x.IdTicket == idTicket);
        }

        public async Task<IEnumerable<TicketColaborator>> GetAll()
        {
            return await _context.TicketColaborators.ToListAsync();
        }

        public async Task<IEnumerable<TicketColaborator>> GetAllByTicketWithColaborator(int idTicket)
        {
            return await _context.TicketColaborators
                .Include(x => x.Colaborator)
                .ThenInclude(x => x!.TechniqueCategory)
                .Where(x => x.IdTicket == idTicket)
                .AsNoTrackingWithIdentityResolution()
                .AsSplitQuery()
                .ToListAsync();
        }

        public async Task<IEnumerable<TicketColaborator>> Search(Expression<Func<TicketColaborator, bool>> predicate)
        {
            return await _context.TicketColaborators.Where(predicate).ToListAsync();
        }

        public async Task Add(TicketColaborator ticketColaborator)
        {
            await _context.TicketColaborators.AddAsync(ticketColaborator);
        }

        public void Update(TicketColaborator ticketColaborator)
        {
            _context.TicketColaborators.Update(ticketColaborator);
        }

        public void Remove(TicketColaborator ticketColaborator)
        {
            _context.TicketColaborators.Remove(ticketColaborator);
        }
    }
}
