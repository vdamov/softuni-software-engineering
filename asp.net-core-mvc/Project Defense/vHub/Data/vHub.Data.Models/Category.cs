using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using vHub.Data.Common.Models;

namespace vHub.Data.Models
{
    public class Category : BaseModel<string>
    {
        public Category()
        {
            Id = Guid.NewGuid().ToString();
            Videos = new HashSet<Video>();
        }
        [Required]
        public string Name { get; set; }

        public ICollection<Video> Videos { get; set; }
    }
}
