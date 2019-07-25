namespace vHub.Services
{
    public interface IVideoService
    {
        System.Threading.Tasks.Task<Data.Models.Video> GetByIdAsync(string id);
        System.Threading.Tasks.Task<string> CreateAsync(Data.Models.Video video);
    }
}