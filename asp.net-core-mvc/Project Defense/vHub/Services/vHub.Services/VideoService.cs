using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vHub.Data.Common.Repositories;
using vHub.Data.Models;
namespace vHub.Services
{
    public class VideoService : IVideoService
    {
        private readonly IRepository<Video> repository;

        public VideoService(IRepository<Video> repository)
        {
            this.repository = repository;
        }
        public async Task<string> CreateAsync(Video video)
        {
            repository.Add(video);
            await repository.SaveChangesAsync();
            var videoEntity = await repository.All()
                .SingleOrDefaultAsync(v => v.CreatedOn == video.CreatedOn && v.AuthorId == video.AuthorId);

            return videoEntity.Id;
        }

        public async Task<Video> GetByIdAsync(string id)
        {
            var video = await repository.All()
                .Include(e => e.Author)
                .Include(e => e.Category)
                .SingleOrDefaultAsync(v => v.Id == id);
            return video;
        }

        public  async Task<List<Video>> GetAllOrderByCreatedOnDescAsync()
        {
            var videos = await repository.All()
                .Include(v => v.Author)
                .OrderByDescending(v => v.CreatedOn)
                .ToListAsync();
            return videos;
        }
        public async Task<List<Video>> Take5ByCategoryIdAsync(string categoryId, string videoId)
        {
            var fiveVideos = new List<Video>();
            var sameCategory = await repository.All().Where(v => v.CategoryId == categoryId && v.Id != videoId)
                .Include(v => v.Author)
                 .Take(5)
                 .ToListAsync();
            fiveVideos.AddRange(sameCategory);
            if (sameCategory.Count < 5)
            {
                var rest = 5 - sameCategory.Count;
                var differentCategory = await repository.All()
                      .Where(v => v.CategoryId != categoryId)
                      .Include(v => v.Author)
                      .Take(rest)
                      .ToListAsync();
                fiveVideos.AddRange(differentCategory);


            }
            return fiveVideos;

        }
    }
}
