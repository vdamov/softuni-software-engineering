using System.ComponentModel.DataAnnotations;

namespace vHub.Web.ViewModels.Rate
{
    public class CheckIfVotedBindingModel
    {
        [Required]
        public string VideoId { get; set; }
    }
}
