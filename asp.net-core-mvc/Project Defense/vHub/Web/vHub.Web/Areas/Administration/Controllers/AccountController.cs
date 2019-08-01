using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using vHub.Common;
using vHub.Data.Common.Repositories;
using vHub.Data.Models;
using vHub.Services;
using vHub.Web.Areas.Administration.ViewModels.Account;
using vHub.Web.Infrastructure.Extensions;

namespace vHub.Web.Areas.Administration.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IAccountService accountService;

        public AccountController(IAccountService accountService)
        {
            this.accountService = accountService;
        }
        [HttpPost]
        public async Task<IActionResult> Ban([FromBody]AccountBanBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetFirstError());
            }
            var result = await accountService.BanByUsername(model.Username);

            if (!result)
            {
                return NotFound();

            }
            return Ok();
        }
    }
}