using Application.Common.Interfaces;
using Infrastructure.Common.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Common
{
    public static class ConfiguareServices
    {
        public static IServiceCollection AddInfrastructuresServices(this IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IProductGroupRepository, ProductGroupRepository>();
            return services;
        }
    }
}
