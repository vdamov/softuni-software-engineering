using System;
using System.Collections.Generic;
using vHub.Common.Mapping;
using vHub.Data.Models;

namespace vHub.Web.ViewModels.Account
{
    public class AccountGetByIdViewModel : IMapFrom<ApplicationUser>
    {
        public AccountGetByIdViewModel()
        {
            Uploads = new List<AccountGeyByIdThumbnailViewModel>();
            Liked = new List<AccountGeyByIdThumbnailViewModel>();
        }
        public string Username { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreatedOn { get; set; }
        public int UploadedCount { get; set; }
        public int LikesCount { get; set; }
        public int TotalViews { get; set; }
        public ICollection<AccountGeyByIdThumbnailViewModel> Uploads { get; set; }
        public ICollection<AccountGeyByIdThumbnailViewModel> Liked { get; set; }
    }

    public class AccountGeyByIdThumbnailViewModel : IMapFrom<Data.Models.Video>
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string ThumbnailUrl { get; set; }
        public int Views { get; set; }
        public string AuthorUsername { get; set; }
    }
}
