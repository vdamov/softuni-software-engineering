using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using vHub.Services;
using vHub.Web.Areas.Administration.ViewModels.Video;
using vHub.Web.Infrastructure.Extensions;

namespace vHub.Web.Areas.Administration.Controllers
{
    public class VideoController : BaseController
    {
        private readonly IVideoService videoService;

        public VideoController(IVideoService videoService)
        {
            this.videoService = videoService;
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
        [HttpGet]
        public async Task<IActionResult> AllDeleted()
        {
            var videos = await videoService.GetAllDeletedAsync();
            var viewModel = Mapper.Map<List<VideoAllDeletedViewModel>>(videos);

            return Json(viewModel);
        }
        [HttpPut]
        public async Task<IActionResult> Restore([FromBody]VideoRestoreByIdBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetFirstError());
            }
            var result = await videoService.RestoreByIdAsync(model.Id);

            if (!result)
            {
                return NotFound();

            }
            return Ok();
        }
    }
}