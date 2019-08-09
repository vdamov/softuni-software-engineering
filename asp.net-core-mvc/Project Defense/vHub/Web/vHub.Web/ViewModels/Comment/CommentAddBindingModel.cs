using System.ComponentModel.DataAnnotations;
using vHub.Common.Mapping;

namespace vHub.Web.ViewModels.Comment
{
    public class CommentAddBindingModel : IMapTo<Data.Models.Comment>
    {
        [Required]
        public string VideoId { get; set; }
        [Required]
        public string Content { get; set; }
    }
}
