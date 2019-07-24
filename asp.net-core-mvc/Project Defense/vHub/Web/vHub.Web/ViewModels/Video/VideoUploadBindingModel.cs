using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using vHub.Common.Mapping;

namespace vHub.Web.ViewModels.Video
{
    public class VideoUploadBindingModel : IMapTo<Data.Models.Video>
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string ThumbnailUrl { get; set; }
        [Required]
        public string VideoUrl { get; set; }
        [Required]
        public string CategoryName { get; set; }
       

       
    }
}
