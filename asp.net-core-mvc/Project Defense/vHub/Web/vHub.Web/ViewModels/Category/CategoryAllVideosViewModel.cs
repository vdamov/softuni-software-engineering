using vHub.Common.Mapping;

namespace vHub.Web.ViewModels.Category
{
    public class CategoryAllVideosViewModel : IMapFrom<Data.Models.Video>
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string ThumbnailUrl { get; set; }
        public int Views { get; set; }
        public string AuthorUsername { get; set; }
    }
}
