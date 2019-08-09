namespace vHub.Services
{
    public interface ICommentSerivce
    {
        System.Threading.Tasks.Task<Data.Models.Comment> AddAsync(Data.Models.Comment comment);
        System.Threading.Tasks.Task<bool> DeleteByIdAsync(string id);
        System.Threading.Tasks.Task<System.Collections.Generic.List<Data.Models.Comment>> Get10ByVideoIdAsync(int page, string videoId);
        System.Threading.Tasks.Task<System.Collections.Generic.List<Data.Models.Comment>> GetAllDeletedAsync();
        System.Threading.Tasks.Task<bool> RestoreByIdAsync(string id);
    }
}