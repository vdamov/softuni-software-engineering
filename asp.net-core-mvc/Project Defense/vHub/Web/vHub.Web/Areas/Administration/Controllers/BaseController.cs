using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using vHub.Common;

namespace vHub.Web.Areas.Administration.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = GlobalConstants.AdministratorRoleName)]
    [Route("api/admin/{controller}/{action}/{id?}")]
    public class BaseController : Controller {}
}