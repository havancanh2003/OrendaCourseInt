using Application.DTOs;

namespace Application.Interfaces
{
    public interface IProductService
    {
        Task<ProductDto> GetProductByIdAsync(int id);
        Task<List<ProductDto>> GetAllProductAsync();
        Task<PaginationResult<ProductDto>> GetAllProductByFilter(PaginationRequest request, int? categoryId, string? productName);
        Task AddProductAsync(ProductDto model);
        Task UpdateProductAsync(ProductDto model);
        Task DeleteProductAsync(int id);
    }
}
