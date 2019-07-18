using System;
using System.Collections.Generic;
using System.Text;
using vHub.Data.Common.Models;

namespace vHub.Data.Models
{
    public class Comment : BaseModel<string>
    {
        public string Context { get; set; }
        public string AuthorId { get; set; }
        public ApplicationUser Author { get; set; }
        public string VideoId { get; set; }
        public Video Video { get; set; }
    }
}
