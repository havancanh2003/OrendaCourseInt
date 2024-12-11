using Application.Mappings;
using Application.Services;
using Application.Services.Interfaces;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
namespace Application
{
    public static class ConfigurationServicesApplication
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IProductGroupService, ProductGroupService>();

            services.AddAutoMapper(typeof(MappingProfile));
            return services;
        }
    }
}
