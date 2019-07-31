namespace vHub.Services
{
    public interface IAccountService
    {
        System.Threading.Tasks.Task<bool> BanByUsername(string username);
        System.Threading.Tasks.Task<Data.Models.ApplicationUser> GetByUsernameAsync(string username);
    }
}