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
        public async Task<string> Upload(Video video)
        {
            repository.Add(video);
            await repository.SaveChangesAsync();
            var videoId = repository.All()
                .SingleOrDefault(v => v.CreatedOn == video.CreatedOn && v.AuthorId == video.AuthorId).Id;

            return videoId;
        }
    }
}
