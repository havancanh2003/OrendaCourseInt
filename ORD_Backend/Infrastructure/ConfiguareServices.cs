using Application.Repository;
using Application.Repository.Interfaces;
using Domain.Entities;
using Domain.Settings;
using Infrastructure.Common;
using Infrastructure.Common.Repositories;
using Infrastructure.Data;
using Infrastructure.Identity.Enums;
using Infrastructure.Identity.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Infrastructure
{
    public static class ConfiguareServices
    {
        public static IServiceCollection AddInfrastructuresServices(this IServiceCollection services, IConfiguration configuration)
        {
            // kết nối cơ sở dữ liệu
            var conn = configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseMySql(conn, ServerVersion.AutoDetect(conn));
                options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            });
            // kết thúc kết nối cơ sở dữ liệu

            // lấy ra config jwt
            services.Configure<JWT>(configuration.GetSection("JWT"));

            // cấu hình Identity
            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.SignIn.RequireConfirmedEmail = false;
            }).AddEntityFrameworkStores<ApplicationDbContext>()
              .AddDefaultTokenProviders();

            // cấu hình authen mặc định JwtBearerDefaults
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(b =>
            {
                b.RequireHttpsMetadata = false;
                b.SaveToken = false;
                b.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidIssuer = configuration["JWT:Issuer"],
                    ValidAudience = configuration["JWT:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Key"])),
                };
             });

            // phân quyền 
            services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin", policy => policy.RequireRole(Roles.Admin.ToString(), Roles.SuperAdmin.ToString()));
                options.AddPolicy("SuperAdmin", policy => policy.RequireRole(Roles.SuperAdmin.ToString()));
            });

            // add services
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IAuthResponse, AuthResponseService>();
            services.AddScoped<IProductGroupRepository, ProductGroupRepository>();

            return services;
        }
    }
}
