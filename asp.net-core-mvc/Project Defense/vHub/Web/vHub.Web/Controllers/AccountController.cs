using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vHub.Common;
using vHub.Data.Common.Enums;
using vHub.Data.Models;
using vHub.Services;
using vHub.Web.Infrastructure.Extensions;
using vHub.Web.ViewModels.Account;

namespace vHub.Web.Controllers
{
    [AllowAnonymous]
    public class AccountController : BaseController
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IAccountService accountService;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            IAccountService accountService)
        {
            this.userManager = userManager;
            this.accountService = accountService;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromForm]AccountRegisterBindingModel model)
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
        [HttpGet("api/{controller}/{action}/{username}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(string username)
        {
            var user = await accountService.GetByUsernameAsync(username);
            if (user == null)
            {
                return BadRequest();
            }
            var viewModel = Mapper.Map<AccountGetByIdViewModel>(user);

            return Json(viewModel);


        }

    }
}
