using SULS.Data;
using SULS.Models;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace SULS.Services
{
    public class UserService : IUserService
    {
        private readonly SULSContext dbContext;

        public UserService(SULSContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public string RegisterUser(User user)
        {
            user.Password = HashPassword(user.Password);
            user = dbContext.Users.Add(user).Entity;
            dbContext.SaveChanges();

            return user.Id;


        }

        public User LoginUser(string username, string password)
        {
            var user = dbContext.Users
                .SingleOrDefault(u => u.Username == username && u.Password == HashPassword(password));
            return user;
        }

        private string HashPassword(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                return Encoding.UTF8.GetString(sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password)));
            }
        }
    }
}
