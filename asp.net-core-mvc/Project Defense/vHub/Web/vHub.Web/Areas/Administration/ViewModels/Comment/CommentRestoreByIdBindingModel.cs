﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace vHub.Web.Areas.Administration.ViewModels.Comment
{
    public class CommentRestoreByIdBindingModel
    {
        [Required]
        public string Id { get; set; }
    }
}
