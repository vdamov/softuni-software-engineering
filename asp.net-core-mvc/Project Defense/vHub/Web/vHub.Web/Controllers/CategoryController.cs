using System.Linq;
using Microsoft.AspNetCore.Mvc;
using vHub.Services;
using vHub.Web.ViewModels.Category;
using vHub.Common.Mapping;
using Microsoft.AspNetCore.Authorization;

namespace vHub.Web.Controllers
{
    [AllowAnonymous]
    public class CategoryController : BaseController
    {
        private readonly ICategoryService categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }
        [HttpGet]
        public IActionResult All()
        {
            var categories = categoryService.GetAll().To<CategoryGetAllViewModel>().ToList();
            return Json(categories);
        }
    }
}