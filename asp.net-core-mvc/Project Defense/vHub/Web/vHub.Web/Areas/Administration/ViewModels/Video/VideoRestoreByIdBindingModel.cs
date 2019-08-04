using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace vHub.Web.Areas.Administration.ViewModels.Video
{
    public class VideoRestoreByIdBindingModel
    {
        [Required]
        public string Id { get; set; }
    }
}
