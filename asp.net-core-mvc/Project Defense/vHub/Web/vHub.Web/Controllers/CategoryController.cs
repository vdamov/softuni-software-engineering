using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using vHub.Services;
using vHub.Web.ViewModels.Category;

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
            var categories = categoryService.GetAll().ToList();
            Mapper.Map<List<CategoryGetAllViewModel>>(categories);
            return Json(categories);
        }
    }
}