using SIS.MvcFramework.Attributes.Validation;

namespace SULS.App.ViewModels.Submissions
{
    public class SubmissionInputModel
    {
        private const string CodeErrorMessage = "Submission must be between 30 and 800 chars!";

        [RequiredSis]
        [StringLengthSis(30,800, CodeErrorMessage)]
        public string Code { get; set; }
        [RequiredSis]
        public string ProblemId { get; set; }
    }
}
