using Microsoft.EntityFrameworkCore;
using SULS.Data;
using SULS.Models;
using System.Collections.Generic;
using System.Linq;

namespace SULS.Services
{
    public class ProblemService : IProblemService
    {
        private readonly SULSContext dbContext;

        public ProblemService(SULSContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public List<Problem> GetAll()
        {
            var problems = dbContext.Problems.Include(p => p.Submissions).ToList();
            return problems;
        }
        public bool Create(Problem problem)
        {
            dbContext.Add(problem);
            dbContext.SaveChanges();
            return true;
        }
        public Problem GetById(string problemId)
        {
            var problem = dbContext.Problems.Find(problemId);

            return problem;
        }
        
    }
}
