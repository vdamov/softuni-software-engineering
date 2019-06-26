using SIS.MvcFramework.Attributes.Validation;

namespace SULS.App.ViewModels.Users
{
    public class LoginInputModel
    {
        private const string UsernameErrorMessage = "Username must be between 5 and 20 chars!";
        private const string RequiredErrorMessage = "All fields are required";
        private const string PasswordErrorMessage = "Password must be between 6 and 20 chars!";

        [RequiredSis(RequiredErrorMessage)]
        [StringLengthSis(5,20, UsernameErrorMessage)]
        public string Username { get; set; }
        [RequiredSis(RequiredErrorMessage)]
        [StringLengthSis(6,20, PasswordErrorMessage)]
        public string Password { get; set; }
    }
}
