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
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using AutoMapper;

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
        public async Task<IActionResult> Register([FromForm]UserRegisterBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetFirstError());
            }
            var user = Mapper.Map<ApplicationUser>(model);
            var result = await userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.GetFirstError());
        }
    }
}
