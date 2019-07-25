using Microsoft.EntityFrameworkCore;
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
    }
}
