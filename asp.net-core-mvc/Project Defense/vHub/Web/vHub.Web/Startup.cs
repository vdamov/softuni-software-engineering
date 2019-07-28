namespace vHub.Web
{
    using System;
    using System.Linq;
    using System.Net;
    using System.Reflection;
    using System.Security.Claims;
    using System.Security.Principal;
    using System.Text;
    using System.Threading.Tasks;

    using vHub.Common;
    using vHub.Common.Mapping;
    using vHub.Data;
    using vHub.Data.Common.Repositories;
    using vHub.Data.Models;
    using vHub.Data.Repositories;
    using vHub.Data.Seeding;
    using vHub.Web.Infrastructure.Middlewares.Auth;

    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Diagnostics;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    using Newtonsoft.Json;
    using Microsoft.AspNetCore.SpaServices.AngularCli;
    using System.IO;
    using vHub.Services;
    using vHub.Web.ViewModels.Category;

    public class Startup
    {
        private readonly IConfiguration configuration;

        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Framework services
            services.AddDbContextPool<ApplicationDbContext>(
                options => options.UseSqlServer(this.configuration.GetConnectionString("DefaultConnection")));

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.configuration["JwtTokenValidation:Secret"]));

            services.Configure<TokenProviderOptions>(opts =>
            {
                opts.Audience = this.configuration["JwtTokenValidation:Audience"];
                opts.Issuer = this.configuration["JwtTokenValidation:Issuer"];
                opts.Path = "/api/account/login";
                opts.Expiration = TimeSpan.FromDays(1);
                opts.SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            });

            services
                .AddAuthentication()
                .AddJwtBearer(opts =>
                {
                    opts.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = signingKey,
                        ValidateIssuer = true,
                        ValidIssuer = this.configuration["JwtTokenValidation:Issuer"],
                        ValidateAudience = true,
                        ValidAudience = this.configuration["JwtTokenValidation:Audience"],
                        ValidateLifetime = true,
                    };
                });

            services
                .AddIdentity<ApplicationUser, ApplicationRole>(options =>
                {
                    options.Password.RequiredLength = 6;
                    options.Password.RequireDigit = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;

                    options.User.RequireUniqueEmail = true;
                })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddUserStore<ApplicationUserStore>()
                .AddRoleStore<ApplicationRoleStore>()
                .AddDefaultTokenProviders();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddSingleton(this.configuration);

            // Data repositories
            services.AddScoped(typeof(IDeletableEntityRepository<>), typeof(EfDeletableEntityRepository<>));
            services.AddScoped(typeof(IRepository<>), typeof(EfRepository<>));

            // Application services
            services.AddTransient<IVideoService, VideoService>();
            services.AddTransient<ICategoryService, CategoryService>();
            services.AddTransient<IRateService, RateService>();
            services.AddTransient<IAccountService, AccountService>();

            // Identity stores
            services.AddTransient<IUserStore<ApplicationUser>, ApplicationUserStore>();
            services.AddTransient<IRoleStore<ApplicationRole>, ApplicationRoleStore>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            AutoMapperConfig.RegisterMappings(typeof(CategoryGetAllViewModel).GetTypeInfo().Assembly);

            // Seed data on application startup
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                if (env.IsDevelopment())
                {
                    dbContext.Database.Migrate();
                }

                ApplicationDbContextSeeder.Seed(dbContext, serviceScope.ServiceProvider);
            }

            if (env.IsDevelopment())
            {
                app.UseExceptionHandler(application =>
                {
                    application.Run(async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        context.Response.ContentType = GlobalConstants.JsonContentType;

                        var ex = context.Features.Get<IExceptionHandlerFeature>();
                        if (ex != null)
                        {
                            await context.Response
                                .WriteAsync(JsonConvert.SerializeObject(new { ex.Error?.Message, ex.Error?.StackTrace }))
                                .ConfigureAwait(continueOnCapturedContext: false);
                        }
                    });
                });
            }

            app.UseFileServer();

            app.UseJwtBearerTokens(
                app.ApplicationServices.GetRequiredService<IOptions<TokenProviderOptions>>(),
                PrincipalResolver);

            app.UseMvc(routes => routes.MapRoute("default", "api/{controller}/{action}/{id?}"));
            app.UseSpa(spa =>
            {

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }

        private static async Task<GenericPrincipal> PrincipalResolver(HttpContext context)
        {
            Credentials credentials;
            using (var reader = new StreamReader(context.Request.Body))
            {
                var content = await reader.ReadToEndAsync();
                credentials = JsonConvert.DeserializeObject<Credentials>(content);
            }

            var userManager = context.RequestServices.GetRequiredService<UserManager<ApplicationUser>>();
            var user = await userManager.FindByNameAsync(credentials.Username);

            if (user == null || user.IsDeleted)
            {
                return null;
            }


            var isValidPassword = await userManager.CheckPasswordAsync(user, credentials.Password);
            if (!isValidPassword)
            {
                return null;
            }

            var roles = await userManager.GetRolesAsync(user);

            var identity = new GenericIdentity(credentials.Username, "Token");
            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.Id));

            return new GenericPrincipal(identity, roles.ToArray());
        }
        private class Credentials
        {

            public string Username { get; set; }
            public string Password { get; set; }
        }
    }
}
