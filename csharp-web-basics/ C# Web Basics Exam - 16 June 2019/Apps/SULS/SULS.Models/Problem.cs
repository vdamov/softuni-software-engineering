using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SULS.Models
{
    public class Problem
    {
        public string Id { get; set; }
        [Required]
        [StringLength(20)]
        public string Name { get; set; }
        [Range(50, 300)]
        public int Points { get; set; }
        public ICollection<Submission> Submissions { get; set; }
        public Problem()
        {
            Submissions = new HashSet<Submission>();
        }
    }
}
