using Application.DTOs;
using Domain.Entities;


namespace Application.Common.Interfaces
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<PaginationResult<Product>> GetAllProductByFilter(PaginationRequest request, int? categoryId, string? productName);
    }
}
