namespace vHub.Services
{
    public interface IVideoService
    {
        System.Threading.Tasks.Task<Data.Models.Video> GetByIdAsync(string id);
        System.Threading.Tasks.Task<string> CreateAsync(Data.Models.Video video);
        System.Threading.Tasks.Task<System.Collections.Generic.List<Data.Models.Video>> Take5ByCategoryIdAsync(string categoryId, string videoId);
        System.Threading.Tasks.Task<System.Collections.Generic.List<Data.Models.Video>> Get20OrderByCreatedOnDescAsync(int page);
        System.Threading.Tasks.Task<bool> AddViewAsync(string videoId);
        System.Threading.Tasks.Task<System.Collections.Generic.List<Data.Models.Video>> SearchAsync(int page, string query);
        System.Threading.Tasks.Task<bool> DeleteByIdAsync(string id);
        System.Threading.Tasks.Task<System.Collections.Generic.List<Data.Models.Video>> GetAllDeletedAsync();
        System.Threading.Tasks.Task<bool> RestoreByIdAsync(string id);
    }
}