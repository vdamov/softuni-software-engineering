using SIS.MvcFramework;
using SIS.MvcFramework.Attributes;
using SIS.MvcFramework.Attributes.Security;
using SIS.MvcFramework.Result;
using SULS.App.ViewModels.Submissions;
using SULS.Models;
using SULS.Services;
using System;

namespace SULS.App.Controllers
{
    public class SubmissionsController : Controller
    {
        private readonly IProblemService problemService;
        private readonly ISubmissionService submissionService;

        public SubmissionsController(IProblemService problemService, ISubmissionService submissionService)
        {
            this.problemService = problemService;
            this.submissionService = submissionService;
        }
        [Authorize]
        public IActionResult Create(string id)
        {
            var problem = problemService.GetById(id);

            if (problem == null)
            {
                return Redirect("/");
            }
            var problemModel = new ProblemModel()
            {
                ProblemId = problem.Id,
                Name = problem.Name
            };
            return View(problemModel);
        }

        [Authorize]
        [HttpPost]
        public IActionResult Create(SubmissionInputModel model)
        {
            if (!ModelState.IsValid)
            {
                return Redirect("/Submissions/Create?id=" + model.ProblemId);
            }
            var problem = problemService.GetById(model.ProblemId);


            if (problem == null)
            {
                return Redirect("/Submissions/Create");
            }
            var rnd = new Random();
            var randomScore = rnd.Next(0, problem.Points);
            var submission = new Submission()
            {
                Code = model.Code,
                CreatedOn = DateTime.Now,
                ProblemId = problem.Id,
                UserId = User.Id,
                AchievedResult = randomScore

            };
            submissionService.Create(submission);
            return Redirect("/");
        }
        [Authorize]
        public IActionResult Delete(string id)
        {
            submissionService.DeleteById(id);
            return Redirect("/");
        }
    }
}
