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
        private readonly IDeletableEntityRepository<ApplicationUser> userRepository;
        private readonly IDeletableEntityRepository<Rate> rateRepository;
        private readonly IDeletableEntityRepository<Video> videoRepository;
        private readonly IDeletableEntityRepository<Comment> commentRepository;

        public AccountService(
            IDeletableEntityRepository<ApplicationUser> userRepository,
            IDeletableEntityRepository<Rate> rateRepository,
            IDeletableEntityRepository<Video> videoRepository,
            IDeletableEntityRepository<Comment> commentRepository
            )
        {
            this.userRepository = userRepository;
            this.rateRepository = rateRepository;
            this.videoRepository = videoRepository;
            this.commentRepository = commentRepository;
        }
        public async Task<ApplicationUser> GetByUsernameAsync(string username)
        {
            var user = await userRepository.All()
                     .Include(u => u.Ratings)
                     .ThenInclude(r => r.Video)
                     .ThenInclude(v => v.Author)
                     .Include(u => u.Uploads)
                .SingleOrDefaultAsync(u => u.UserName == username);



            return user;
        }
        public async Task<bool> BanByUsernameAsync(string username)
        {
            var user = await userRepository.All()
                .Include(u => u.Uploads)
                .Include(u => u.Ratings)
                .Include(u => u.Comments)
                .SingleOrDefaultAsync(u => u.UserName == username);
            if (user == null)
            {
                return false;
            }
            foreach (var rate in user.Ratings)
            {
                rateRepository.Delete(rate);
            }
            foreach (var comment in user.Comments)
            {
                commentRepository.Delete(comment);
            }
            foreach (var video in user.Uploads)
            {
                videoRepository.Delete(video);
            }
            userRepository.Delete(user);

            await rateRepository.SaveChangesAsync();
            await commentRepository.SaveChangesAsync();
            await videoRepository.SaveChangesAsync();
            await userRepository.SaveChangesAsync();


            return true;
        }

        public async Task<bool> UnbanByIdAsync(string id)
        {
            var user = await userRepository.AllWithDeleted()
                .Include(u => u.Uploads)
                .Include(u => u.Ratings)
                .Include(u => u.Comments)
                .SingleOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return false;
            }
            foreach (var rate in user.Ratings)
            {
                rateRepository.Undelete(rate);
            }
            foreach (var comment in user.Comments)
            {
                commentRepository.Undelete(comment);
            }
            foreach (var video in user.Uploads)
            {
                videoRepository.Undelete(video);
            }
            userRepository.Undelete(user);

            await rateRepository.SaveChangesAsync();
            await commentRepository.SaveChangesAsync();
            await videoRepository.SaveChangesAsync();
            await userRepository.SaveChangesAsync();


            return true;
        }

        public async Task<List<ApplicationUser>> GetAllDeletedAsync()
        {
            var users = await userRepository.AllWithDeleted()
                   .Where(u => u.IsDeleted)
                   .Include(u => u.Uploads)
                   .Include(u => u.Comments)
                   .Include(u => u.Ratings)
                   .ToListAsync();
            return users;
        }

    }
}
