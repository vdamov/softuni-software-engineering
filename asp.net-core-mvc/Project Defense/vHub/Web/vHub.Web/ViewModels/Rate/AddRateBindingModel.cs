using System.ComponentModel.DataAnnotations;
using vHub.Common.Mapping;
using vHub.Data.Common.Enums;

namespace vHub.Web.ViewModels.Rate
{
    public class AddRateBindingModel : IMapTo<Data.Models.Rate>
    {
        [Required]
        public RateType Rating { get; set; }
        [Required]
        public string VideoId { get; set; }
    }
}
