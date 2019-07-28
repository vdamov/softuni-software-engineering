using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using vHub.Data.Common.Enums;
using vHub.Data.Common.Repositories;
using vHub.Data.Models;

namespace vHub.Services
{
    public class AccountService : IAccountService
    {
        private readonly IRepository<ApplicationUser> repository;

        public AccountService(IRepository<ApplicationUser> repository)
        {
            this.repository = repository;
        }
        public async Task<ApplicationUser> GetByIdAsync(string id)
        {
            var user = await repository.All()
                     .Include(u => u.Ratings)
                     .ThenInclude(r => r.Video)
                     .ThenInclude(v => v.Author)
                     .Include(u => u.Uploads)
                .SingleOrDefaultAsync(u => u.Id == id);



            return user;
        }
      
    }
}
