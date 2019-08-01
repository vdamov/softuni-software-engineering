using System.ComponentModel.DataAnnotations;

namespace vHub.Web.Areas.Administration.ViewModels.Account
{
    public class AccountBanBindingModel
    {
        [Required]
        public string Username { get; set; }
    }
}
