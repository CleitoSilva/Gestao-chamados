using api.Models;
using server.Dto;
using System.Linq.Expressions;

namespace api.Interfaces.Repositories
{
    public interface IEventRepository
    {
        Task Add(Event eventMsg);
        void Update(Event eventMsg);
        void Remove(Event eventMsg);
        Task<Event?> GetById(int id);
        Task<IEnumerable<Event>> GetAll();
        Task<IEnumerable<Event>> GetAllByTicket(int idTicket);
        Task<IEnumerable<Event>> Search(Expression<Func<Event, bool>> predicate);
        //Task<Paginate<Event>> GetPaginate(int page, int take, EventFilter? filter);
    }
}
