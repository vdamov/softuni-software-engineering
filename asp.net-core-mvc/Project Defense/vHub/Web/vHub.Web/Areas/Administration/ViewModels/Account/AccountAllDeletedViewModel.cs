using AutoMapper;
using System;
using vHub.Common.Mapping;
using vHub.Data.Models;

namespace vHub.Web.Areas.Administration.ViewModels.Account
{
    public class AccountAllDeletedViewModel : IHaveCustomMappings
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public int VideosCount { get; set; }
        public int RatingsCount { get; set; }
        public int CommentsCount { get; set; }
        public DateTime DeletedOn { get; set; }

        public void CreateMappings(IMapperConfigurationExpression configuration)
        {
            configuration.CreateMap<ApplicationUser, AccountAllDeletedViewModel>()
                .ForMember(dest => dest.VideosCount, opt => opt.MapFrom(src => src.Uploads.Count))
                .ForMember(dest => dest.RatingsCount, opt => opt.MapFrom(src => src.Ratings.Count))
                .ForMember(dest => dest.CommentsCount, opt => opt.MapFrom(src => src.Comments.Count));

        }
    }
}
