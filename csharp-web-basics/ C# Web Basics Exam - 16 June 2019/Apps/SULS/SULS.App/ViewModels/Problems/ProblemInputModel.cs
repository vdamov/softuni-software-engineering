using SIS.MvcFramework.Attributes.Validation;

namespace SULS.App.ViewModels.Problems
{
    public class ProblemInputModel
    {
        private const string RequireErrorMessage = "All fields are required";
        private const string NameErrorMessage = "Problem's name must be between 5 and 20 chars!";
        private const string PointsErrorMessage = "Problem's points must be between 50 and 300!";

        [RequiredSis(RequireErrorMessage)]
        [StringLengthSis(5,20, NameErrorMessage)]
        public string Name { get; set; }
        [RequiredSis(RequireErrorMessage)]
        [RangeSis(50,300, PointsErrorMessage)]
        public int Points { get; set; }
    }
}
