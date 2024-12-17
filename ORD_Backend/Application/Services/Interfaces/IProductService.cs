using Application.Common;
using Application.Common.Pagination;
using Application.DTOs;

namespace Application.Services.Interfaces
{
    public interface IProductService
    {
        Task<ProductDto> GetProductByIdAsync(int id);
        Task<List<ProductDto>> GetAllProductAsync();
        Task<PaginationResult<ProductDto>> GetAllProductByFilter(PaginationRequest request, int? productGroupId, string? productName, bool? isActve);
        Task<DataResponse<ProductDto>> AddProductAsync(ProductDto model);
        Task<DataResponse<ProductDto>> UpdateProductAsync(ProductDto model);
        Task<DataResponse<ProductDto>> DeleteProductAsync(int id);
        Task<ProductDto> GetProductActiveByIdAsync(int id);
        Task<int> AddManyProductAsync(List<ProductDto> productDtos);
    }
}
