using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using vHub.Data.Models;
using vHub.Services;
using vHub.Web.Infrastructure.Extensions;
using vHub.Web.ViewModels.Comment;

namespace vHub.Web.Controllers
{
    public class CommentController : BaseController
    {
        private readonly ICommentSerivce commentSerivce;

        public CommentController(ICommentSerivce commentSerivce)
        {
            this.commentSerivce = commentSerivce;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll(string id)
        {
            if (id == null)
            {
                return BadRequest();
            }
            var comments = await commentSerivce.GetAllByVideoIdAsync(id);
            var viewModel = Mapper.Map<List<CommentGetAllViewModel>>(comments);
            return Json(viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]CommentAddBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetFirstError());
            }
            var comment = Mapper.Map<Comment>(model);
            comment.AuthorId = User.GetId();

            if (comment.AuthorId == null)
            {
                return BadRequest();
            }
            comment = await commentSerivce.AddAsync(comment);
            var viewModel = Mapper.Map<CommentAddViewModel>(comment);
            return Ok(viewModel);
        }
        [HttpPost]
        public async Task<IActionResult> Delete([FromBody]CommentDeleteBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetFirstError());
            }
            var result = await commentSerivce.DeleteByIdAsync(model.Id);

            if (!result)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}