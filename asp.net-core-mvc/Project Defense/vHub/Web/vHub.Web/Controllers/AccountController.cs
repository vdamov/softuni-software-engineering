using System.Threading.Tasks;

using vHub.Data.Models;
using vHub.Web.Infrastructure.Extensions;
using vHub.Web.ViewModels.Account;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Linq;

namespace vHub.Web.Controllers
{
    [AllowAnonymous]
    public class AccountController : BaseController
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IHostingEnvironment environment;

        public AccountController(UserManager<ApplicationUser> userManager, IHostingEnvironment environment)
        {
            this.userManager = userManager;
            this.environment = environment;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody]UserRegisterBindingModel model)
        {
            var fileNameToLower = model.image.FileName.ToLower();
            var isCorrectExtension = fileNameToLower.EndsWith(".jpg")
                || fileNameToLower.EndsWith(".jpeg")
                || fileNameToLower.EndsWith(".png");
            var maxContentLength = 1024 * 512;
            if (!ModelState.IsValid || model.image == null || model.image.Length > maxContentLength || !isCorrectExtension)
            {
                return BadRequest(ModelState.GetFirstError());
            }
            var user = new ApplicationUser { Email = model.Email, UserName = model.Username };

            if (!Directory.Exists(environment.WebRootPath + "\\profile-pictures\\"))
            {
                Directory.CreateDirectory(environment.WebRootPath + "\\profile-pictures\\");
            }
            var imagePath = environment.WebRootPath + "\\profile-pictures\\" + user.Id + '.' + fileNameToLower.Split(".").Last();
            using (FileStream filestream = System.IO.File.Create(imagePath))
            {
                await model.image.CopyToAsync(filestream);
                await filestream.FlushAsync();
            }
            user.ImageUrl = "\\profile-pictures\\" + user.Id;

            var result = await userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.GetFirstError());
        }
    }
}
