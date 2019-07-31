namespace vHub.Services
{
    public interface ICategoryService
    {
        System.Threading.Tasks.Task<System.Collections.Generic.List<Data.Models.Category>> GetAllAsync();
        System.Threading.Tasks.Task<System.Collections.Generic.List<Data.Models.Video>> GetAllVideosByCategoryNameAsync(string name);
        System.Threading.Tasks.Task<Data.Models.Category> GetCategoryByNameAsync(string name);
    }
}