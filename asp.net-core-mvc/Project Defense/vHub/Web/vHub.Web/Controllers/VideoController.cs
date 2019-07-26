﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using vHub.Data.Models;
using vHub.Services;
using vHub.Web.Infrastructure.Extensions;
using vHub.Web.ViewModels.Video;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

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
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll()
        {
            var videos = await videoService.GetAllOrderByCreatedOnDescAsync();
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
    }
}