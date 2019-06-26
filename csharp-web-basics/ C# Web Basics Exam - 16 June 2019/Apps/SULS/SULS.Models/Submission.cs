using System;
using System.ComponentModel.DataAnnotations;

namespace SULS.Models
{
    public class Submission
    {
        public string Id { get; set; }
        [Required]
        [StringLength(800)]
        public string Code { get; set; }
        [Range(0, 300)]
        public int AchievedResult { get; set; }
        [Required]
        public DateTime CreatedOn { get; set; }
        [Required]
        public string ProblemId { get; set; }
        public Problem Problem { get; set; }
        [Required]
        public string UserId { get; set; }
        public User User { get; set; }

    }
}
