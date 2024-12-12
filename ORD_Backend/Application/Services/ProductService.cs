using Application.Common;
using Application.Common.Const;
using Application.Common.Pagination;
using Application.DTOs;
using Application.Repository;
using Application.Repository.Interfaces;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;

namespace Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProductService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Service thêm mới sản phẩm
        /// </summary>
        public async Task<DataResponse<ProductDto>> AddProductAsync(ProductDto model)
        {
            var checkProductG = await _unitOfWork.ProductGroupRepository.CheckProductGroupIsActiveById(model.ProductGroupId);
            if (checkProductG == null) {
                throw new Exception("Danh mục sản phẩm này không tồn tại trong hệ thống, hoặc đã bị xoá, hoặc trạng thái hoạt động đã bị ngưng");
            }
            var entity = _mapper.Map<Product>(model);
            // ===> cách 1 (sử dụng DI tiêm repo vào chính services) : await _productRepository.AddAsync(entity);

            // ===> cách 2 : use unit of work
            await _unitOfWork.ExecuteTransactionAsync(async () => await _unitOfWork.ProductRepository.AddAsync(entity));

            return new DataResponse<ProductDto>(new List<ProductDto> { _mapper.Map<ProductDto>(entity) }, true, DefindConstantsMesseges.SUCCESS);
        }
        /// <summary>
        /// Service update sản phẩm
        /// </summary>
        public async Task<DataResponse<ProductDto>> UpdateProductAsync(ProductDto model)
        {
            var checkProductG = await _unitOfWork.ProductGroupRepository.CheckProductGroupIsActiveById(model.ProductGroupId);
            if (checkProductG == null)
            {
                throw new Exception("Danh mục sản phẩm này không tồn tại trong hệ thống, hoặc đã bị xoá, hoặc trạng thái hoạt động đã bị ngưng");
            }
            var entity = _mapper.Map<Product>(model);
            // ===> cách 1 : await _productRepository.UpdateAsync(entity);

            // ===> cách 2 : use unit of work
            await _unitOfWork.ExecuteTransactionAsync(() => _unitOfWork.ProductRepository.Update(entity));

            return new DataResponse<ProductDto>(new List<ProductDto> { _mapper.Map<ProductDto>(entity) }, true, DefindConstantsMesseges.SUCCESS);
        }
        /// <summary>
        /// Service Xoá sản phẩm
        /// </summary>
        public async Task<DataResponse<ProductDto>> DeleteProductAsync(int id)
        {
            // ===> cách 1 : await _productRepository.DeleteAsync(id);
            // ===> cách 2 : await _unitOfWork.ExecuteTransactionAsync(async () => await _unitOfWork.ProductRepository.DeleteAsync(id));

            // ===> cách 3 :
            await _unitOfWork.ProductGroupRepository.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();

            return new DataResponse<ProductDto>(new List<ProductDto>(), true, DefindConstantsMesseges.SUCCESS);
        }
        /// <summary>
        /// Service lấy tất cả sản phẩm
        /// </summary>
        public async Task<List<ProductDto>> GetAllProductAsync()
        {
            var result = await _unitOfWork.ProductRepository.GetAllAsync();
            return _mapper.Map<List<ProductDto>>(result);
        }
        /// <summary>
        /// Service lấy tất cả sản phẩm theo bộ lọc
        /// </summary>
        public async Task<PaginationResult<ProductDto>> GetAllProductByFilter(PaginationRequest request, int? categoryId, string? productName)
        {
            var result = await _unitOfWork.ProductRepository.GetAllProductByFilter(request, categoryId, productName);
            return new PaginationResult<ProductDto>(_mapper.Map<List<ProductDto>>(result.Items),result.TotalRecords,result.PageSize,result.CurrentPage);
        }

        /// <summary>
        /// lấy bất kì sản phẩm nào theo id dù nó đã bị xoá hay ngưng hđ
        /// </summary>
        public async Task<ProductDto> GetProductByIdAsync(int id)
        {
            var product = await _unitOfWork.ProductRepository.GetByIdAsync(id);
            return _mapper.Map<ProductDto>(product);
        }
        /// <summary>
        /// lấy sản phẩm còn sử dụng
        /// </summary>
        public async Task<ProductDto> GetProductActiveByIdAsync(int id)
        {
            var product = await _unitOfWork.ProductRepository.GetProductActiveByIdAsync(id);
            return _mapper.Map<ProductDto>(product);
        }
    }
}
