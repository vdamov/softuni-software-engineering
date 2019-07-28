using System;
using vHub.Common.Mapping;

namespace vHub.Web.ViewModels.Video
{
    public class VideoGetByIdViewModel : IMapFrom<Data.Models.Video>
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string VideoUrl { get; set; }
        public string ThumbnailUrl { get; set; }
        public string CategoryName { get; set; }
        public string CategoryId { get; set; }
        public DateTime CreatedOn { get; set; }
        public int Views { get; set; }
        public string AuthorId { get; set; }
        public string AuthorUsername { get; set; }
        public string AuthorImageUrl { get; set; }
    }
}
