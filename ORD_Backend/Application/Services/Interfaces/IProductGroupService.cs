using Application.Common;
using Application.DTOs;

namespace Application.Services.Interfaces
{
    public interface IProductGroupService
    {
        Task<List<ProductGroupDto>> GetAllProductGroup();
        Task<DataResponse<ProductGroupDto>> AddProductGroupAsync(ProductGroupDto model);
        Task<(ProductGroupDto info, List<ProductDto> pDtos)> AddManyProductInNewProductGroup(ProductGroupDto newProductGroup, ICollection<ProductDto> products);
    }
}
