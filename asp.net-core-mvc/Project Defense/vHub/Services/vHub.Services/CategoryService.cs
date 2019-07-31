using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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
        public async Task<List<Category>> GetAllAsync()
        {

            var categories = await repository.All().ToListAsync();

            return categories;
        }
        public async Task<Category> GetCategoryByNameAsync(string name)
        {
            var category = await repository.All().SingleOrDefaultAsync(c => c.Name == name);
            return category;
        }

        public async Task<List<Video>> GetAllVideosByCategoryNameAsync(string name)
        {
            var category = await repository
                     .All()
                     .Include(c => c.Videos)
                     .ThenInclude(v => v.Author)
                     .SingleOrDefaultAsync(c => c.Name == name);

            if (category == null)
            {
                return null;
            }
            var videos = category.Videos.OrderByDescending(v => v.CreatedOn).ToList();

            return videos;
        }
    }
}
