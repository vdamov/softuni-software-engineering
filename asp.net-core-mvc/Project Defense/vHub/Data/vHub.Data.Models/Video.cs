using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using vHub.Data.Common.Models;

namespace vHub.Data.Models
{
    public class Video : BaseModel<string>
    {
        public Video()
        {
            Id = Guid.NewGuid().ToString();
            Ratings = new HashSet<Rate>();
            Comments = new HashSet<Comment>();
        }
        [Required]
        [StringLength(30)]
        public string Title { get; set; }
        [Required]
        public string ThumbnailUrl { get; set; }
        [Required]
        public string VideoUrl { get; set; }
        public int Views { get; set; }
        [ForeignKey(nameof(ApplicationUser))]
        public string AuthorId { get; set; }
        public ApplicationUser Author { get; set; }
        [ForeignKey(nameof(Models.Category))]
        public string CategoryId { get; set; }
        public Category Category { get; set; }
        public ICollection<Rate> Ratings { get; set; }
        public ICollection<Comment> Comments { get; set; }

    }
}
