using Microsoft.AspNetCore.Mvc;
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