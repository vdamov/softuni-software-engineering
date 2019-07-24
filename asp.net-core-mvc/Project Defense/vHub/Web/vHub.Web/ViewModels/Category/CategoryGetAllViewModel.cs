using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using vHub.Common.Mapping;

namespace vHub.Web.ViewModels.Category
{
    public class CategoryGetAllViewModel : IMapFrom<Data.Models.Category>
    {
        [Required]
        public string Name { get; set; }
    }
}
