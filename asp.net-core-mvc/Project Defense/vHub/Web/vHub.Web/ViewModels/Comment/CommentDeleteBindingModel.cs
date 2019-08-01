using System.ComponentModel.DataAnnotations;

namespace vHub.Web.ViewModels.Comment
{
    public class CommentDeleteBindingModel
    {
        [Required]
        public string Id { get; set; }
    }
}
