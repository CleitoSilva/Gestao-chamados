namespace api.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> queryable, int page, int take)
        {
            return queryable
                .Skip((page - 1) * take)
                .Take(take);
        }
    }
}
