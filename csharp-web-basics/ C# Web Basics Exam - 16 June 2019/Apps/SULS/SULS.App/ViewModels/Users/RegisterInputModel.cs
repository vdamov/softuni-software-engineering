using SIS.MvcFramework.Attributes.Validation;

namespace SULS.App.ViewModels.Users
{
    public class RegisterInputModel
    {
        private const string UsernameErrorMessage = "Username must be between 5 and 20 chars!";
        private const string RequiredErrorMessage = "All fields are required";
        private const string PasswordErrorMessage = "Password must be between 6 and 20 chars!";
        private const string EmailErrorMessage = "Please type a valid email address!";

        [RequiredSis(RequiredErrorMessage)]
        [StringLengthSis(5, 20, UsernameErrorMessage)]
        public string Username { get; set; }
        [RequiredSis(RequiredErrorMessage)]
        [EmailSis(EmailErrorMessage)]
        public string Email { get; set; }
        [RequiredSis(RequiredErrorMessage)]
        [StringLengthSis(6, 20, PasswordErrorMessage)]
        public string Password { get; set; }
        [RequiredSis(RequiredErrorMessage)]
        [StringLengthSis(6, 20, PasswordErrorMessage)]
        public string ConfirmPassword { get; set; }
    }
}
