using SIS.MvcFramework;
using SIS.MvcFramework.Attributes;
using SIS.MvcFramework.Attributes.Security;
using SIS.MvcFramework.Result;
using SULS.App.ViewModels.Problems;
using SULS.Models;
using SULS.Services;
using System;
using System.Linq;

namespace SULS.App.Controllers
{
    public class ProblemsController : Controller
    {
        private readonly IProblemService problemService;
        private readonly ISubmissionService submissionService;

        public ProblemsController(IProblemService problemService, ISubmissionService submissionService)
        {
            this.problemService = problemService;
            this.submissionService = submissionService;
        }
        [Authorize]
        public IActionResult Create()
        {
            return View();
        }
        [Authorize]
        [HttpPost]
        public IActionResult Create(ProblemInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return Redirect("/Problems/Create");
            }
            var problem = new Problem()
            {
                Name = model.Name,
                Points = model.Points
            };
            problemService.Create(problem);
            return Redirect("/");
        }
        [Authorize]
        public IActionResult Details(string id)
        {
            var submissions = submissionService.GetAllByProblemId(id);
            var problem = problemService.GetById(id);
           
            var model = new ProblemSubmissionModel() { Name = problem.Name };
            foreach (var submission in submissions)
            {
                int result = (int)Math.Round((((double)submission.AchievedResult / (double)submission.Problem.Points) * 100.0));
                model.Submissions.Add(new SubmissionCollectionModel
                {
                    Username = submission.User.Username,
                    SubmissionId = submission.Id,
                    CreatedOn = DateTime.Now.ToString(@"dd/MM/yyyy"),
                    MaxPoints = 100,
                    AchievedResult = result
                });
            }

            return View(model);

        }

    }
}
