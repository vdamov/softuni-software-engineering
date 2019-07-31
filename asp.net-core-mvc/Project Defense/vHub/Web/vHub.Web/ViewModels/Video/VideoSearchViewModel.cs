using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vHub.Common.Mapping;

namespace vHub.Web.ViewModels.Video
{
    public class VideoSearchViewModel : IMapFrom<Data.Models.Video>
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string ThumbnailUrl { get; set; }
        public int Views { get; set; }
        public string AuthorUsername { get; set; }
    }
}
