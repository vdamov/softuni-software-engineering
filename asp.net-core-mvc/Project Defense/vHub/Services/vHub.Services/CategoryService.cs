using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
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
        public async Task<Category> GetCategoryByNameAsync(string name)
        {
            var category = await repository.All().SingleOrDefaultAsync(c => c.Name == name);
            return category;
        }
    }
}
