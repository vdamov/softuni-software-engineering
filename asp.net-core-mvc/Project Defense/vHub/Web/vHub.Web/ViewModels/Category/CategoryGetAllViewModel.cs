using System.ComponentModel.DataAnnotations;
using vHub.Common.Mapping;

namespace vHub.Web.ViewModels.Category
{
    public class CategoryGetAllViewModel : IMapFrom<Data.Models.Category>
    {
        [Required]
        public string Name { get; set; }
    }
}
