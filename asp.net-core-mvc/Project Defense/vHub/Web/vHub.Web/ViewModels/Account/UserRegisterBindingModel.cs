using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace vHub.Web.ViewModels.Account
{
    public class UserRegisterBindingModel
    {
        [Required]
        [MinLength(4)]
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
        public IFormFile Image { get; set; }
    }
}
