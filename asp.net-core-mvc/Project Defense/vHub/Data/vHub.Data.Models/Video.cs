using System;
using System.Collections.Generic;
using System.Text;
using vHub.Data.Common.Models;

namespace vHub.Data.Models
{
    public class Video : BaseModel<string>
    {
        public Video()
        {
            Ratings = new HashSet<Rate>();
            Comments = new HashSet<Comment>();
        }
        public string Title { get; set; }
        public string ThumbnailUrl { get; set; }
        public int Views { get; set; }
        public string AuthorId { get; set; }
        public ApplicationUser Author { get; set; }
        public string CategoryId { get; set; }
        public Category Category { get; set; }
        public ICollection<Rate> Ratings { get; set; }
        public ICollection<Comment> Comments { get; set; }

    }
}
