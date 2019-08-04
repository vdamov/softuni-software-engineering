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
        private readonly IDeletableEntityRepository<Video> videoRepository;
        private readonly IDeletableEntityRepository<Comment> commentRepository;
        private readonly IDeletableEntityRepository<Rate> rateRepository;

        public VideoService(IDeletableEntityRepository<Video> videoRepository,
                            IDeletableEntityRepository<Comment> commentRepository,
                            IDeletableEntityRepository<Rate> rateRepository)
        {
            this.videoRepository = videoRepository;
            this.commentRepository = commentRepository;
            this.rateRepository = rateRepository;
        }
        public async Task<string> CreateAsync(Video video)
        {
            videoRepository.Add(video);
            await videoRepository.SaveChangesAsync();
            var videoEntity = await videoRepository.All()
                .SingleOrDefaultAsync(v => v.CreatedOn == video.CreatedOn && v.AuthorId == video.AuthorId);

            return videoEntity.Id;
        }

        public async Task<Video> GetByIdAsync(string id)
        {
            var video = await videoRepository.All()
                .Include(e => e.Author)
                .Include(e => e.Category)
                .SingleOrDefaultAsync(v => v.Id == id);
            return video;
        }

        public async Task<List<Video>> GetAllOrderByCreatedOnDescAsync()
        {
            var videos = await videoRepository.All()
                .Include(v => v.Author)
                .OrderByDescending(v => v.CreatedOn)
                .ToListAsync();
            return videos;
        }

        public async Task<List<Video>> Take5ByCategoryIdAsync(string categoryId, string videoId)
        {
            var fiveVideos = new List<Video>();
            var sameCategory = await videoRepository.All().Where(v => v.CategoryId == categoryId && v.Id != videoId)
                .Include(v => v.Author)
                 .Take(5)
                 .ToListAsync();
            fiveVideos.AddRange(sameCategory);
            if (sameCategory.Count < 5)
            {
                var rest = 5 - sameCategory.Count;
                var differentCategory = await videoRepository.All()
                      .Where(v => v.CategoryId != categoryId)
                      .Include(v => v.Author)
                      .Take(rest)
                      .ToListAsync();
                fiveVideos.AddRange(differentCategory);


            }
            return fiveVideos;

        }

        public async Task<bool> AddViewAsync(string videoId)
        {
            var video = await videoRepository.GetByIdAsync(videoId);
            if (video == null)
            {
                return false;
            }
            video.Views = ++video.Views;
            await videoRepository.SaveChangesAsync();
            return true;
        }
        public async Task<List<Video>> SearchAsync(string value)
        {
            var videos = await videoRepository
                .All()
                .Where(v => v.Title.Contains(value))
                .Include(v => v.Author)
                .ToListAsync();

            return videos;
        }

        public async Task<bool> DeleteByIdAsync(string id)
        {
            var video = await videoRepository.All()
                .Include(v => v.Comments)
                .Include(v => v.Ratings)
                .SingleOrDefaultAsync(v => v.Id == id);

            if (video == null)
            {
                return false;
            }
            foreach (var rate in video.Ratings)
            {
                this.rateRepository.Delete(rate);
            }
            foreach (var comment in video.Comments)
            {
                this.commentRepository.Delete(comment);
            }
            await rateRepository.SaveChangesAsync();
            await commentRepository.SaveChangesAsync();
            videoRepository.Delete(video);
            var result = await videoRepository.SaveChangesAsync();

            return result > 0;
        }
        public async Task<bool> RestoreByIdAsync(string id)
        {
            var video = await videoRepository.AllWithDeleted()
                .Include(v => v.Comments)
                .Include(v => v.Ratings)
                .SingleOrDefaultAsync(v => v.Id == id);

            if (video == null)
            {
                return false;
            }
            foreach (var rate in video.Ratings)
            {
                this.rateRepository.Undelete(rate);
            }
            foreach (var comment in video.Comments)
            {
                this.commentRepository.Undelete(comment);
            }
            await rateRepository.SaveChangesAsync();
            await commentRepository.SaveChangesAsync();
            videoRepository.Undelete(video);
            var result = await videoRepository.SaveChangesAsync();

            return result > 0;
        }
        public async Task<List<Video>> GetAllDeletedAsync()
        {
            var videos = await videoRepository.AllWithDeleted()
                .Where(v => v.IsDeleted)
                .Include(v => v.Author)
                .ToListAsync();

            return videos;
        }

    }
}
