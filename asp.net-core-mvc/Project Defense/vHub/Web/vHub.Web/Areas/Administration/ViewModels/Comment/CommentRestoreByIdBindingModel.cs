using System.ComponentModel.DataAnnotations;

namespace vHub.Web.Areas.Administration.ViewModels.Comment
{
    public class CommentRestoreByIdBindingModel
    {
        [Required]
        public string Id { get; set; }
    }
}
