namespace server.Dto
{
    public class Paginate<T>
    {
        public ICollection<T> Items { get; set; } = new List<T>();
        public int PagesCount { get; set; }
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
        public int ItemsCount { get; set; }
    }
}
