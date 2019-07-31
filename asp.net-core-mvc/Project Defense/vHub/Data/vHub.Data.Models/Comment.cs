using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using vHub.Data.Common.Models;

namespace vHub.Data.Models
{
    public class Comment : BaseModel<string>
    {
        public Comment()
        {
            Id = Guid.NewGuid().ToString();
        }
        [Required]
        public string Content { get; set; }
        [ForeignKey(nameof(ApplicationUser))]
        public string AuthorId { get; set; }
        public ApplicationUser Author { get; set; }
        [ForeignKey(nameof(Models.Video))]
        public string VideoId { get; set; }
        public Video Video { get; set; }
    }
}
