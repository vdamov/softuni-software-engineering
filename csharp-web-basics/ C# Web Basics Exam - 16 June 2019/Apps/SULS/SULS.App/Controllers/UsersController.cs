using SIS.MvcFramework;
using SIS.MvcFramework.Attributes;
using SIS.MvcFramework.Attributes.Security;
using SIS.MvcFramework.Result;
using SULS.App.ViewModels.Users;
using SULS.Models;
using SULS.Services;

namespace SULS.App.Controllers
{
    public class UsersController : Controller
    {
        private readonly IUserService userService;

        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }

        public IActionResult Login()
        {
            if (IsLoggedIn())
            {
                return Redirect("/");
            }
            return View();
        }

        [HttpPost]
        public IActionResult Login(LoginInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return Redirect("/Users/Login");
            }

            var user = userService.LoginUser(model.Username, model.Password);
            if (user == null)
            {
                return Redirect("/Users/Login");
            }

            SignIn(user.Id, user.Username, user.Email);
            return Redirect("/");
        }

        public IActionResult Register()
        {
            if (IsLoggedIn())
            {
                return Redirect("/");
            }
            return View();
        }

        [HttpPost]
        public IActionResult Register(RegisterInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return Redirect("/Users/Register");
            }

            if (model.Password != model.ConfirmPassword)
            {
                return Redirect("/Users/Register");
            }
            var user = new User() { Email = model.Email, Password = model.Password, Username = model.Username };
            var userId = userService.RegisterUser(user);
            //SignIn(userId, model.Username, model.Email);
            return Redirect("/Users/Login");
        }

        [Authorize]
        public IActionResult Logout()
        {
            SignOut();
            return Redirect("/");
        }
    }
}