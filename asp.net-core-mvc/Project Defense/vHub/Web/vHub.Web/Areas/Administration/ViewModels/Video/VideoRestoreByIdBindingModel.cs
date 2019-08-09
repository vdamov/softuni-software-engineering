using System.ComponentModel.DataAnnotations;

namespace vHub.Web.Areas.Administration.ViewModels.Video
{
    public class VideoRestoreByIdBindingModel
    {
        [Required]
        public string Id { get; set; }
    }
}
