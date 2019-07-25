namespace vHub.Services
{
    public interface ICategoryService
    {
        System.Linq.IQueryable<Data.Models.Category> GetAll();
        System.Threading.Tasks.Task<Data.Models.Category> GetCategoryByNameAsync(string name);
    }
}