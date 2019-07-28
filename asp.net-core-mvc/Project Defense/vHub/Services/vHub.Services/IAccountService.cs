namespace vHub.Services
{
    public interface IAccountService
    {
        System.Threading.Tasks.Task<Data.Models.ApplicationUser> GetByIdAsync(string id);
    }
}