using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vHub.Data.Models;
using vHub.Services;
using vHub.Tests.Common;

namespace vHub.Tests.Services
{
    [TestFixture]
    public class CategoryServiceTests
    {
        private ICategoryService categoryService;
        private List<Category> data;
        [SetUp]
        public void SetUp()
        {
            data = DataCollection.Categories;

            var repo = MockRepository<Category>.Initialize(data);
            categoryService = new CategoryService(repo);
        }
        [Test]
        public async Task GetAll_ShouldReturnAllCategories()
        {
            var categories = await categoryService.GetAllAsync();
            CollectionAssert.AreEqual(categories, data);
        }
        [Test]
        public async Task GetCategoryByName_ShouldReturnCorrectCategory()
        {
            var categoryName1 = "invalid";
            Category expected1 = null;
            var actual1 = await categoryService.GetCategoryByNameAsync(categoryName1);

            var categoryName2 = "Music";
            var expected2 = data[0];
            var actual2 = await categoryService.GetCategoryByNameAsync(categoryName2);


            var categoryName3 = "Ot4her";
            var expected3 = data[3];
            var actual3 = await categoryService.GetCategoryByNameAsync(categoryName3);
            Assert.Multiple(() =>
            {
                Assert.AreEqual(expected1, actual1);
                Assert.AreEqual(expected2, actual2);
                Assert.AreNotEqual(expected3, actual3);
            });


        }
        [Test]
        public async Task Get20VideosByCategoryName_ShouldReturnVideosInCorrectOrder()
        {
            var page = 0;
            var categoryName1 = "invalid";
            List<Video> expected1 = null;
            var actual1 = await categoryService.Get20VideosByCategoryNameOrderByDescAsync(page, categoryName1);

            var categoryName2 = "Music";
            List<Video> expected2 = data[0].Videos.OrderByDescending(v => v.CreatedOn).Skip(20 * page).Take(20).ToList();
            var actual2 = await categoryService.Get20VideosByCategoryNameOrderByDescAsync(page, categoryName2);

            var categoryName3 = "Educational";
            List<Video> expected3 = data[1].Videos.OrderByDescending(v => v.CreatedOn).Skip(20 * page).Take(20).ToList();
            var actual3 = await categoryService.Get20VideosByCategoryNameOrderByDescAsync(page, categoryName3);

            var categoryName4 = "Music";
            List<Video> expected4 = data[0].Videos.Skip(page * 20).Take(20).ToList();
            var actual4 = await categoryService.Get20VideosByCategoryNameOrderByDescAsync(page, categoryName4);

            Assert.Multiple(() =>
            {
                CollectionAssert.AreEqual(expected1, actual1);
                CollectionAssert.AreEqual(expected2, actual2);
                CollectionAssert.AreEqual(expected3, actual3);
                CollectionAssert.AreNotEqual(expected4, actual4);
            });

        }
    }
}
