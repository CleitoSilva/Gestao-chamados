namespace api.Interfaces
{
    public interface IUnitOfWork
    {
        Task<int> Commit();
    }
}
