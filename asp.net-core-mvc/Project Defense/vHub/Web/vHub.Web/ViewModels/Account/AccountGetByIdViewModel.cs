using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using vHub.Common.Mapping;
using vHub.Data.Common.Enums;
using vHub.Data.Models;

namespace vHub.Web.ViewModels.Account
{
    public class AccountGetByIdViewModel : IHaveCustomMappings
    {
        public AccountGetByIdViewModel()
        {
            Uploads = new List<AccountGeyByIdThumbnailViewModel>();
            Liked = new List<AccountGeyByIdThumbnailViewModel>();
        }
        public string Username { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreatedOn { get; set; }
        public int VideosCount { get; set; }
        public int LikesCount { get; set; }
        public int TotalViews { get; set; }
        public ICollection<AccountGeyByIdThumbnailViewModel> Uploads { get; set; }
        public ICollection<AccountGeyByIdThumbnailViewModel> Liked { get; set; }

        public void CreateMappings(IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<ApplicationUser, AccountGetByIdViewModel>()
                .ForMember(dest => dest.VideosCount, opt => opt.MapFrom(src => src.Uploads.Count))
                .ForMember(dest => dest.Liked, opt => opt.MapFrom(src => src.Ratings.Where(r => r.Rating == RateType.Like).Select(r => r.Video).ToList()))
                .ForMember(dest => dest.TotalViews, opt => opt.MapFrom(src => src.Uploads.Sum(v => v.Views)))
                .ForMember(dest => dest.LikesCount, opt => opt.MapFrom(src => src.Ratings.Where(r => r.Rating == RateType.Like).Select(r => r.Video).Count()));
        }
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
