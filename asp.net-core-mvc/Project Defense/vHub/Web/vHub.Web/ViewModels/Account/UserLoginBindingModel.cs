using System.ComponentModel.DataAnnotations;

namespace vHub.Web.ViewModels.Account
{
    public class UserLoginBindingModel
    {
        [Required(AllowEmptyStrings = false)]
        [DataType(DataType.Text)]
        [MinLength(4)]
        public string Username { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [MinLength(6)]
        public string Password { get; set; }

    }
}
