namespace vHub.Services
{
    public interface IRateService
    {
        System.Threading.Tasks.Task AddAsync(Data.Models.Rate rate);
        System.Threading.Tasks.Task<bool> CheckIfVotedAsync(string videoId, string authorId);
        System.Threading.Tasks.Task<bool> DeleteByIdAsync(string id);
        System.Threading.Tasks.Task<int> GetCountByVideoIdAndRateTypeAsync(string videoId, Data.Common.Enums.RateType type);
        System.Threading.Tasks.Task<bool> RestoreByIdAsync(string id);
    }
}