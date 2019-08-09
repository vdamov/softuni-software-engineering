namespace vHub.Web.Infrastructure.Extensions
{
    using Microsoft.AspNetCore.Identity;
    using System;
    using System.Linq;

    public static class IdentityResultExtensions
    {
        public static string GetFirstError(this IdentityResult identityResult)
        {
            if (identityResult == null)
            {
                throw new ArgumentNullException(nameof(identityResult));
            }

            return identityResult.Errors.Select(e => e.Description).FirstOrDefault();
        }
    }
}
