using System.Linq;
using vHub.Data.Common.Repositories;
using vHub.Data.Models;
namespace vHub.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Category> repository;

        public CategoryService(IRepository<Category> repository)
        {
            this.repository = repository;
        }
        public IQueryable<Category> GetAll()
        {

            var categories = repository.All();

            return categories;
        }
        public Category GetCategoryByName(string name)
        {
            var category = repository.All().SingleOrDefault(c => c.Name == name);
            return category;
        }
    }
}
