namespace vHub.Services
{
    public interface IAccountService
    {
        System.Threading.Tasks.Task<bool> BanByUsernameAsync(string username);
        System.Threading.Tasks.Task<System.Collections.Generic.List<Data.Models.ApplicationUser>> GetAllDeletedAsync();
        System.Threading.Tasks.Task<Data.Models.ApplicationUser> GetByUsernameAsync(string username);
        System.Threading.Tasks.Task<bool> UnbanByIdAsync(string username);
    }
}