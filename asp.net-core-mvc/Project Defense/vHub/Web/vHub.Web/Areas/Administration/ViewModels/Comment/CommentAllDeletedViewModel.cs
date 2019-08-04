using System;
using vHub.Common.Mapping;

namespace vHub.Web.Areas.Administration.ViewModels.Comment
{
    public class CommentAllDeletedViewModel : IMapFrom<Data.Models.Comment>
    {
        public string Id { get; set; }
        public string AuthorUsername { get; set; }
        public string VideoTitle { get; set; }
        public string Content { get; set; }
        public DateTime DeletedOn { get; set; }
    }
}
