using Application.Common.Interfaces;
using Infrastructure.Common.Repositories;
using Infrastructure.Identity.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class ConfiguareServices
    {
        public static IServiceCollection AddInfrastructuresServices(this IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IAuthResponse, AuthResponseService>();
            services.AddScoped<IProductGroupRepository, ProductGroupRepository>();
            return services;
        }
    }
}
