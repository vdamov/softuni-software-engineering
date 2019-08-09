using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using vHub.Data.Common.Enums;
using vHub.Data.Common.Repositories;
using vHub.Data.Models;

namespace vHub.Services
{
    public class RateService : IRateService
    {
        private readonly IDeletableEntityRepository<Rate> repository;

        public RateService(IDeletableEntityRepository<Rate> repository)
        {
            this.repository = repository;
        }

        public async Task<int> GetCountByVideoIdAndRateTypeAsync(string videoId, RateType type)
        {
            var likesCount = await repository.All()
                   .Where(c => c.VideoId == videoId && c.Rating == type)
                   .CountAsync();

            return likesCount;
        }
        public async Task AddAsync(Rate rate)
        {
            repository.Add(rate);
            await repository.SaveChangesAsync();
        }
        public async Task<bool> CheckIfVotedAsync(string videoId, string authorId)
        {
            var hasVoted = await repository.All()
                .AnyAsync(r => r.AuthorId == authorId && r.VideoId == videoId);
            return hasVoted;
        }
        public async Task<bool> DeleteByIdAsync(string id)
        {
            if (id == null)
            {
                return false;
            }
            var rate = await repository.GetByIdAsync(id);
            if (rate == null)
            {
                return false;
            }
            repository.Delete(rate);
            var result = await repository.SaveChangesAsync();
            return result > 0;
        }

        public async Task<bool> RestoreByIdAsync(string id)
        {
            if (id == null)
            {
                return false;
            }
            var rate = await repository.AllWithDeleted().SingleOrDefaultAsync(r => r.Id == id);
            if (rate == null)
            {
                return false;
            }
            repository.Undelete(rate);
            var result = await repository.SaveChangesAsync();
            return result > 0;
        }

    }
}
