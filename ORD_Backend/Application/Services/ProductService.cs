using Application.Common;
using Application.Common.Const;
using Application.Common.Interfaces;
using Application.DTOs;
using Application.Interfaces;
using AutoMapper;
using Domain.Entities;

namespace Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IProductGroupRepository _productGroupRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, IProductGroupRepository productGroupRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _productGroupRepository = productGroupRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Service thêm mới sản phẩm
        /// </summary>
        public async Task<DataResponse<ProductDto>> AddProductAsync(ProductDto model)
        {
            var checkProductG = await _productGroupRepository.CheckProductGroupIsActiveById(model.ProductGroupId);
            if (checkProductG == null) {
                throw new Exception("Danh mục sản phẩm này không tồn tại trong hệ thống, hoặc đã bị xoá, hoặc trạng thái hoạt động đã bị ngưng");
            }
            var entity = _mapper.Map<Product>(model);
            entity.IsActive = true;
            await _productRepository.AddAsync(entity);

            return new DataResponse<ProductDto>(new List<ProductDto> { _mapper.Map<ProductDto>(entity) }, true, DefindConstanMesseges.SUCCESS);
        }
        /// <summary>
        /// Service update sản phẩm
        /// </summary>
        public async Task<DataResponse<ProductDto>> UpdateProductAsync(ProductDto model)
        {
            var checkProductG = await _productGroupRepository.CheckProductGroupIsActiveById(model.ProductGroupId);
            if (checkProductG == null)
            {
                throw new Exception("Danh mục sản phẩm này không tồn tại trong hệ thống, hoặc đã bị xoá, hoặc trạng thái hoạt động đã bị ngưng");
            }
            var entity = _mapper.Map<Product>(model);
            await _productRepository.UpdateAsync(entity);

            return new DataResponse<ProductDto>(new List<ProductDto> { _mapper.Map<ProductDto>(entity) }, true, DefindConstanMesseges.SUCCESS);
        }
        /// <summary>
        /// Service Xoá sản phẩm
        /// </summary>
        public async Task<DataResponse<ProductDto>> DeleteProductAsync(int id)
        {
           await _productRepository.DeleteAsync(id);
           return new DataResponse<ProductDto>(new List<ProductDto>(), true, DefindConstanMesseges.SUCCESS);
        }
        /// <summary>
        /// Service lấy tất cả sản phẩm
        /// </summary>
        public async Task<List<ProductDto>> GetAllProductAsync()
        {
            var result = await _productRepository.GetAllAsync();
            return _mapper.Map<List<ProductDto>>(result);
        }
        /// <summary>
        /// Service lấy tất cả sản phẩm theo bộ lọc
        /// </summary>
        public async Task<PaginationResult<ProductDto>> GetAllProductByFilter(PaginationRequest request, int? categoryId, string? productName)
        {
            var result = await _productRepository.GetAllProductByFilter(request, categoryId, productName);
            return new PaginationResult<ProductDto>(_mapper.Map<List<ProductDto>>(result.Items),result.TotalRecords,result.PageSize,result.CurrentPage);
        }

        /// <summary>
        /// lấy bất kì sản phẩm nào theo id dù nó đã bị xoá hay ngưng hđ
        /// </summary>
        public async Task<ProductDto> GetProductByIdAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            return _mapper.Map<ProductDto>(product);
        }
        /// <summary>
        /// lấy sản phẩm còn sử dụng
        /// </summary>
        public async Task<ProductDto> GetProductActiveByIdAsync(int id)
        {
            var product = await _productRepository.GetProductActiveByIdAsync(id);
            return _mapper.Map<ProductDto>(product);
        }
    }
}
