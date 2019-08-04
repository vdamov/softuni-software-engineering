using System;
using vHub.Common.Mapping;

namespace vHub.Web.Areas.Administration.ViewModels.Video
{
    public class VideoAllDeletedViewModel : IMapFrom<Data.Models.Video>
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string AuthorUsername { get; set; }
        public int Views { get; set; }
        public DateTime DeletedOn { get; set; }
    }
}
