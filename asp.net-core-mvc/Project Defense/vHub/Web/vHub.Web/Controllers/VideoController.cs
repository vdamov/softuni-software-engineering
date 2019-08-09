using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using vHub.Data.Models;
using vHub.Services;
using vHub.Web.Infrastructure.Extensions;
using vHub.Web.ViewModels.Video;

namespace vHub.Web.Controllers
{
    public class VideoController : BaseController
    {
        private readonly IVideoService videoService;
        private readonly ICategoryService categoryService;

        public VideoController(IVideoService videoService, ICategoryService categoryService)
        {
            this.videoService = videoService;
            this.categoryService = categoryService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetById(string id)
        {
            var video = await videoService.GetByIdAsync(id);
            if (video == null || !ModelState.IsValid)
            {
                return NotFound();
            }
            var model = Mapper.Map<VideoGetByIdViewModel>(video);

            return Json(model);

        }

        [HttpPost]
        public async Task<IActionResult> Upload([FromForm] VideoUploadBindingModel model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetFirstError());
            }

            var video = Mapper.Map<Video>(model);
            var category = await categoryService.GetCategoryByNameAsync(model.CategoryName);
            if (category == null)
            {
                return BadRequest();
            }
            video.CategoryId = category.Id;
            video.AuthorId = User.GetId();

            var videoId = await videoService.CreateAsync(video);
            return Json(videoId);
        }
        [HttpGet("api/{controller}/{action}/{page}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get20(int page)
        {
            var videos = await videoService.Get20OrderByCreatedOnDescAsync(page);
            var videosViewModel = Mapper.Map<List<VideoGetAllViewModel>>(videos);

            return Json(videosViewModel);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Take5([FromBody]VideoTake5BindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetFirstError());
            }
            var fiveVideos = await videoService.Take5ByCategoryIdAsync(model.CategoryId, model.VideoId);
            var viewModels = Mapper.Map<List<VideoTake5ViewModel>>(fiveVideos);
            return Ok(viewModels);
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> AddView(string id)
        {

            var result = await videoService.AddViewAsync(id);

            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }
        [HttpGet("api/{controller}/{action}/{page}/{query}")]
        [AllowAnonymous]
        public async Task<IActionResult> Search(int page, string query)
        {
            var videos = await videoService.SearchAsync(page, query);

            var viewModel = Mapper.Map<List<VideoSearchViewModel>>(videos);

            return Json(viewModel);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            if (!ModelState.IsValid || id == null)
            {
                return BadRequest(ModelState.GetFirstError());
            }
            var result = await videoService.DeleteByIdAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}