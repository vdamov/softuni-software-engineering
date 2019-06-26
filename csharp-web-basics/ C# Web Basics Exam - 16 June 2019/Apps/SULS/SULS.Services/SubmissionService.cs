using Microsoft.EntityFrameworkCore;
using SULS.Data;
using SULS.Models;
using System.Collections.Generic;
using System.Linq;

namespace SULS.Services
{
    public class SubmissionService : ISubmissionService
    {
        private readonly SULSContext dbContext;

        public SubmissionService(SULSContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public bool Create(Submission submission)
        {
            dbContext.Add(submission);
            dbContext.SaveChanges();
            return true;
        }
        public List<Submission> GetAllByProblemId(string problemId)
        {
            var submissions = dbContext.Submissions
                .Where(s => s.ProblemId == problemId)
                .Include(s => s.Problem)
                .Include(s => s.User)
                .ToList();
            return submissions;
        }
        public bool DeleteById(string submissionId)
        {
            var submission = dbContext.Submissions.Find(submissionId);
            if (submission == null)
            {
                return false;
            }
            dbContext.Submissions.Remove(submission);
            dbContext.SaveChanges();
            return true;
        }
    }
}
