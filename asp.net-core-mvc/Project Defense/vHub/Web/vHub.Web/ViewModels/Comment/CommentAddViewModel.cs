using System;
using vHub.Common.Mapping;

namespace vHub.Web.ViewModels.Comment
{
    public class CommentAddViewModel : IMapFrom<Data.Models.Comment>
    {
        public string Content { get; set; }
        public DateTime CreatedOn { get; set; }
        public string AuthorUsername { get; set; }
        public string AuthorImageUrl { get; set; }
    }
}
