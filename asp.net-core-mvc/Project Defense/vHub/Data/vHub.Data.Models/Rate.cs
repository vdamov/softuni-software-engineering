using vHub.Data.Common.Enums;
using vHub.Data.Common.Models;

namespace vHub.Data.Models
{
    public class Rate : BaseModel<string>
    {
        public RateType Rating { get; set; }
        public string AuthorId { get; set; }
        public ApplicationUser Author { get; set; }
        public string VideoId { get; set; }
        public Video Video { get; set; }
    }
}
