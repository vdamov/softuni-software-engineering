﻿using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using vHub.Data.Common.Enums;
using vHub.Data.Models;
using vHub.Services;
using vHub.Web.Infrastructure.Extensions;
using vHub.Web.ViewModels.Rate;
using AutoMapper;

namespace vHub.Web.Controllers
{
    public class RateController : BaseController
    {
        private readonly IVideoService videoService;
        private readonly IRateService rateService;

        public RateController(IVideoService videoService, IRateService rateService)
        {
            this.videoService = videoService;
            this.rateService = rateService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll(string id)
        {
            var likes = await rateService.GetCountByVideoIdAndRateTypeAsync(id, RateType.Like);
            var dislikes = await rateService.GetCountByVideoIdAndRateTypeAsync(id, RateType.Dislike);
            var model = new RateGetAllViewModel() { Likes = likes, Dislikes = dislikes };
            return Json(model);
        }
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] AddRateBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetFirstError());
            }
            var authorId = User.GetId();
            if (authorId == null)
            {
                return Unauthorized();
            }
            var hasVoted = await rateService.CheckIfVotedAsync(model.VideoId, authorId);
            if(!hasVoted)
            {
                var rate = Mapper.Map<Rate>(model);
                rate.AuthorId = authorId;

                await rateService.AddAsync(rate);
                return Ok();
            }
            return BadRequest();
        }
        [HttpPost]
        public async Task<IActionResult> CheckIfVoted([FromBody] CheckIfVotedBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetFirstError());
            }
            var authorId = User.GetId();
            if (authorId == null)
            {
                return Unauthorized();
            }

            var hasVoted = await rateService.CheckIfVotedAsync(model.VideoId, authorId);

            return Ok(hasVoted);
        }
    }
}