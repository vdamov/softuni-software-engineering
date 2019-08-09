using System.ComponentModel.DataAnnotations;
using vHub.Common.Mapping;
using vHub.Data.Models;

namespace vHub.Web.ViewModels.Account
{
    public class AccountRegisterBindingModel : IMapTo<ApplicationUser>
    {
        [Required]
        [MinLength(4)]
        [StringLength(15)]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        public string ImageUrl { get; set; }
    }
}
