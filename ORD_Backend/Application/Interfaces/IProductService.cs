using Application.Common;
using Application.DTOs;

namespace Application.Interfaces
{
    public interface IProductService
    {
        Task<ProductDto> GetProductByIdAsync(int id);
        Task<List<ProductDto>> GetAllProductAsync();
        Task<PaginationResult<ProductDto>> GetAllProductByFilter(PaginationRequest request, int? categoryId, string? productName);
        Task<DataResponse<ProductDto>> AddProductAsync(ProductDto model);
        Task<DataResponse<ProductDto>> UpdateProductAsync(ProductDto model);
        Task<DataResponse<ProductDto>> DeleteProductAsync(int id);
        Task<ProductDto> GetProductActiveByIdAsync(int id);
    }
}
