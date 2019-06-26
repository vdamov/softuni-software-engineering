using System;
using System.Collections.Generic;
using System.Text;

namespace SULS.App.ViewModels.Problems
{
    public class ProblemSubmissionModel
    {
        public ProblemSubmissionModel()
        {
            Submissions = new List<SubmissionCollectionModel>();
        }
        public string Name { get; set; }
        public List<SubmissionCollectionModel> Submissions { get; set; }
        

    }
}
