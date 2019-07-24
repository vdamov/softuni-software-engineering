namespace vHub.Services
{
    public interface IVideoService
    {
        System.Threading.Tasks.Task<string> Upload(Data.Models.Video video);
    }
}