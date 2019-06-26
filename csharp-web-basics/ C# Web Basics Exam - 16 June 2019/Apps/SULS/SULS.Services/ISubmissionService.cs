namespace SULS.Services
{
    public interface ISubmissionService
    {
        bool Create(Models.Submission submission);
        bool DeleteById(string submissionId);
        System.Collections.Generic.List<Models.Submission> GetAllByProblemId(string problemId);
    }
}