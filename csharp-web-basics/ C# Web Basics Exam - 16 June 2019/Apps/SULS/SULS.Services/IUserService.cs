using SULS.Models;

namespace SULS.Services
{
    public interface IUserService
    {
        User LoginUser(string username, string password);
        string RegisterUser(Models.User user);
    }
}