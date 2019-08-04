using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using vHub.Services;
using vHub.Web.Areas.Administration.ViewModels.Comment;
using vHub.Web.Infrastructure.Extensions;

namespace vHub.Web.Areas.Administration.Controllers
{
    public class CommentController : BaseController
    {
        private readonly ICommentSerivce commentSerivce;

        public CommentController(ICommentSerivce commentSerivce)
        {
            this.commentSerivce = commentSerivce;
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
        [HttpPut]
        public async Task<IActionResult> Restore([FromBody]CommentRestoreByIdBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetFirstError());
            }
            var result = await commentSerivce.RestoreByIdAsync(model.Id);

            if (!result)
            {
                return NotFound();
            }
            return Ok();
        }
        [HttpGet]
        public async Task<IActionResult> AllDeleted()
        {
            var comments = await commentSerivce.GetAllDeletedAsync();
            var viewModel = Mapper.Map<List<CommentAllDeletedViewModel>>(comments);

            return Json(viewModel);
        }
    }
}