using System.ComponentModel.DataAnnotations;

namespace vHub.Web.Areas.Administration.ViewModels.Comment
{
    public class CommentDeleteBindingModel
    {
        [Required]
        public string Id { get; set; }
    }
}
