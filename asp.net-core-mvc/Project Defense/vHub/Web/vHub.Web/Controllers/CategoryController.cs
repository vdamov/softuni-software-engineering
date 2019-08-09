using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using vHub.Services;
using vHub.Web.ViewModels.Category;

namespace vHub.Web.Controllers
{
    public class CategoryController : BaseController
    {
        private readonly ICategoryService categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }
        [HttpGet]
        public async Task<IActionResult> All()
        {
            var categories = await categoryService.GetAllAsync();
            Mapper.Map<List<CategoryGetAllViewModel>>(categories);
            return Json(categories);
        }
        [HttpGet("api/{controller}/{action}/{page}/{name}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get20(int page, string name)
        {
            var videos = await categoryService.Get20VideosByCategoryNameOrderByDescAsync(page, name);
            if (videos == null)
            {
                return BadRequest();
            }
            var viewModel = Mapper.Map<List<CategoryAllVideosViewModel>>(videos);

            return Json(viewModel);
        }
    }
}