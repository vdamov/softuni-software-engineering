namespace vHub.Services
{
    public interface ICategoryService
    {
        System.Linq.IQueryable<Data.Models.Category> GetAll();
        Data.Models.Category GetCategoryByName(string name);
    }
}