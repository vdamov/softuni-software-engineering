using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vHub.Data.Common.Repositories;
using vHub.Data.Models;

namespace vHub.Services
{
    public class AccountService : IAccountService
    {
        private readonly IVideoService videoService;
        private readonly ICommentSerivce commentSerivce;
        private readonly IRateService rateService;
        private readonly IDeletableEntityRepository<ApplicationUser> userRepository;

        public AccountService(
            IDeletableEntityRepository<ApplicationUser> userRepository,
            IVideoService videoService,
            ICommentSerivce commentSerivce,
            IRateService rateService

            )
        {
            this.videoService = videoService;
            this.userRepository = userRepository;
            this.commentSerivce = commentSerivce;
            this.rateService = rateService;
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
                await rateService.DeleteByIdAsync(rate.Id);
            }
            foreach (var comment in user.Comments)
            {
                await commentSerivce.DeleteByIdAsync(comment.Id);
            }
            foreach (var video in user.Uploads)
            {
                await videoService.DeleteByIdAsync(video.Id);
            }
            userRepository.Delete(user);

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
                await rateService.RestoreByIdAsync(rate.Id);
            }
            foreach (var comment in user.Comments)
            {
                await commentSerivce.RestoreByIdAsync(comment.Id);
            }
            foreach (var video in user.Uploads)
            {
                await videoService.RestoreByIdAsync(video.Id);
            }
            userRepository.Undelete(user);


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
                   .OrderByDescending(u => u.DeletedOn)
                   .ToListAsync();
            return users;
        }

    }
}
