using System.ComponentModel.DataAnnotations;
using vHub.Common.Mapping;

namespace vHub.Web.ViewModels.Video
{
    public class VideoTake5BindingModel : IMapTo<Data.Models.Video>
    {
        [Required]
        public string CategoryId { get; set; }
        [Required]
        public string VideoId { get; set; }
    }
}
