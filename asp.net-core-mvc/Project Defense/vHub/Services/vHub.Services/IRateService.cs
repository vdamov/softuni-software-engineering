namespace vHub.Services
{
    public interface IRateService
    {
        System.Threading.Tasks.Task AddAsync(Data.Models.Rate rate);
        System.Threading.Tasks.Task<int> GetCountByVideoIdAndRateTypeAsync(string videoId, Data.Common.Enums.RateType type);
    }
}