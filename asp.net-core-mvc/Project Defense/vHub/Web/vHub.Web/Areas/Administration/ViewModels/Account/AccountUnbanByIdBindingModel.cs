using System.ComponentModel.DataAnnotations;

namespace vHub.Web.Areas.Administration.ViewModels.Account
{
    public class AccountUnbanByIdBindingModel
    {
        [Required]
        public string Id { get; set; }
    }
}
