using api.Contexts;
using api.Interfaces.Repositories;
using api.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace api.Repositories
{
    public class TicketTechniqueRepository : ITicketTechniqueRepository
    {
        private readonly DataContext _context;

        public TicketTechniqueRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<TicketTechnique?> GetById(int idTechnique, int idTicket)
        {
            return await _context.TicketTechniques.FirstOrDefaultAsync(x => x.IdTechniqueCategory == idTechnique && x.IdTicket == idTicket);
        }

        public async Task<IEnumerable<TicketTechnique>> GetAll()
        {
            return await _context.TicketTechniques.ToListAsync();
        }

        public async Task<IEnumerable<TicketTechnique>> GetAllByTicket(int idTicket)
        {
            return await _context.TicketTechniques
                .Include(x => x.TechniqueCategory)
                .Where(x => x.IdTicket == idTicket)
                .AsNoTrackingWithIdentityResolution()
                .AsSplitQuery()
                .ToListAsync();
        }

        public async Task<IEnumerable<TicketTechnique>> Search(Expression<Func<TicketTechnique, bool>> predicate)
        {
            return await _context.TicketTechniques.Where(predicate).ToListAsync();
        }

        public async Task Add(TicketTechnique ticketTechnique)
        {
            await _context.TicketTechniques.AddAsync(ticketTechnique);
        }

        public void Update(TicketTechnique ticketTechnique)
        {
            _context.TicketTechniques.Update(ticketTechnique);
        }

        public void Remove(TicketTechnique ticketTechnique)
        {
            _context.TicketTechniques.Remove(ticketTechnique);
        }
    }
}
