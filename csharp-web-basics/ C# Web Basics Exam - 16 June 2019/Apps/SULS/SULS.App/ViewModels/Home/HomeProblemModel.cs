using SIS.MvcFramework.Attributes.Validation;
using System;
using System.Collections.Generic;
using System.Text;

namespace SULS.App.ViewModels.Home
{
  public  class HomeProblemModel
    {
        private const string ProblemNameErrorMessage = "Problem's name must be between 5 and 20 chars!";

        [RequiredSis]
        public string Id { get; set; }
        [RequiredSis]
        [StringLengthSis(5,20, ProblemNameErrorMessage)]
        public string Name { get; set; }
        public int Count { get; set; }
    }
}
