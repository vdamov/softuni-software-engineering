using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using vHub.Common;
using vHub.Data.Common.Repositories;
using vHub.Data.Models;
using vHub.Services;

namespace vHub.Web.Areas.Administration.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IAccountService accountService;

        public AccountController(IAccountService accountService)
        {
            this.accountService = accountService;
        }
        [HttpGet("api/{controller}/{action}/{username}")]
        public async Task<IActionResult> Ban(string username)
        {
          
            var result = await accountService.BanByUsername(username);

            if (!result)
            {
                return NotFound();

            }
            return Ok();
        }
    }
}