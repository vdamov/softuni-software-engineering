using System.ComponentModel.DataAnnotations.Schema;
using vHub.Data.Common.Enums;
using vHub.Data.Common.Models;

namespace vHub.Data.Models
{
    public class Rate : BaseModel<string>
    {
        public RateType Rating { get; set; }
        [ForeignKey(nameof(ApplicationUser))]
        public string AuthorId { get; set; }
        public ApplicationUser Author { get; set; }
        [ForeignKey(nameof(Models.Video))]
        public string VideoId { get; set; }
        public Video Video { get; set; }
    }
}
