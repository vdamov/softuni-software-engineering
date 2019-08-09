using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
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

        [HttpGet("api/{controller}/{action}/{page}/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get10(int page, string id)
        {
            if (id == null)
            {
                return BadRequest();
            }
            var comments = await commentSerivce.Get10ByVideoIdAsync(page, id);
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
        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetFirstError());
            }
            var result = await commentSerivce.DeleteByIdAsync(id);

            if (!result)
            {
                return NotFound();
            }
            return Ok();
        }
    }
}