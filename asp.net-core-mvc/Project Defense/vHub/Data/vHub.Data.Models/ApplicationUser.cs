// ReSharper disable VirtualMemberCallInConstructor
namespace vHub.Data.Models
{
    using System;
    using System.Collections.Generic;

    using vHub.Data.Common.Models;

    using Microsoft.AspNetCore.Identity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.ComponentModel;

    public class ApplicationUser : IdentityUser, IAuditInfo, IDeletableEntity
    {
        public ApplicationUser()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Roles = new HashSet<IdentityUserRole<string>>();
            this.Claims = new HashSet<IdentityUserClaim<string>>();
            this.Logins = new HashSet<IdentityUserLogin<string>>();
            this.Uploads = new HashSet<Video>();
        }
        //custom columns
        public string ImageUrl { get; set; }

        [DisplayName("Username")]
        public override string UserName
        {
            get => base.UserName;
            set => base.UserName = value;
        }

        public virtual ICollection<Video> Uploads { get; set; }
        public virtual ICollection<Rate> Ratings { get; set; }

        // Audit info
        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        // Deletable entity
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }

        public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; }

        public virtual ICollection<IdentityUserLogin<string>> Logins { get; set; }



    }
}
