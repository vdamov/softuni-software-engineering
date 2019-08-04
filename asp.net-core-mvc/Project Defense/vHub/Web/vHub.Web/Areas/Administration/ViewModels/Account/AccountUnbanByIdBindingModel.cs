using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace vHub.Web.Areas.Administration.ViewModels.Account
{
    public class AccountUnbanByIdBindingModel
    {
        [Required]
        public string Id { get; set; }
    }
}
