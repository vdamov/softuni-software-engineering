using SIS.MvcFramework;
using SIS.MvcFramework.Attributes;
using SIS.MvcFramework.Result;
using SULS.App.ViewModels.Home;
using SULS.Services;
using System.Linq;

namespace SULS.App.Controllers
{
    public class HomeController : Controller
    {
        private readonly IProblemService problemService;

        public HomeController(IProblemService problemService)
        {
            this.problemService = problemService;
        }
        [HttpGet(Url = "/")]
        public IActionResult IndexSlash()
        {
            return Index();
        }

        public IActionResult Index()
        {
            if (IsLoggedIn())
            {
                var problems = problemService.GetAll()
                    .Select(p => new HomeProblemModel
                    {
                        Name = p.Name,
                        Id = p.Id,
                        Count = p.Submissions.Count
                    }).ToList();
                return View(problems, "IndexLoggedIn");
            }

            return View();
        }
    }
}